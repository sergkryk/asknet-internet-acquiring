import { Request, Response } from 'express';
import { verifyRequestToken } from '../utils/token';
import { PaymentStatusNumeric, StoredPayment } from '../services/db/types';
import { dbClient } from '../services/db/db-client';
import NodeSoap from '../soap/soap';
import { registerReceipt } from '../services/openClient/openClient';
import { PaymentStatus } from '../services/tpayments/types';

// class to handle http errors
export class HttpError extends Error {
  httpStatusCode: number;
  constructor(message: string, httpStatusCode: number) {
    super(message);
    this.httpStatusCode = httpStatusCode;
  }
}
// Common type for all request bodies
export interface BankRequest {
  TerminalKey: string;
  OrderId: string;
  Success: boolean;
  Status: string;
  PaymentId: number;
  ErrorCode: string;
  Amount: number;
  CardId: number;
  Pan: string;
  ExpDate: string;
  Token: string;
}
// Function to check if the request body is a BankRequest
function isBankRequest(request: any): void {
  const checks = [
    'object' === typeof request && request !== null,
    'string' === typeof request.TerminalKey,
    'string' === typeof request.OrderId,
    'boolean' === typeof request.Success,
    'string' === typeof request.Status,
    'number' === typeof request.PaymentId,
    'string' === typeof request.ErrorCode,
    'number' === typeof request.Amount,
    'string' === typeof request.Token,
  ];

  if (!checks.every(Boolean)) {
    throw new HttpError('Invalid request body', 400);
  }
  if (!verifyRequestToken(request)) {
    throw new HttpError('Invalid request token', 400);
  }
}
// Function to compare local and remote payment
function compareLocalAndRemotePayment(localPayment: StoredPayment, remotePayment: BankRequest): void {
  if (localPayment.amount !== remotePayment.Amount || Number(localPayment.payment_id) !== remotePayment.PaymentId) {
    throw new HttpError('Payment mismatch', 400);
  }
}
// function to init and auth soap client
export async function initSoapClient(): Promise<NodeSoap> {
  try {
    if (!process.env.BILLING_LOGIN || !process.env.BILLING_PASSWORD) {
      throw new HttpError('Billing login or password is not set', 400);
    }
    const soap = await NodeSoap.init();
    await soap.login({
      login: process.env.BILLING_LOGIN,
      pass: process.env.BILLING_PASSWORD,
    });
    return soap;
  } catch (error) {
    throw new HttpError('Failed to authenticate db client', 400);
  }
}
// function to fetch local payment
async function fetchLocalPayment(paymentId: string): Promise<StoredPayment> {
  try {
    const result = await dbClient.getPayment(paymentId);
    if (result === null) {
      throw new HttpError('Payment not found', 400);
    }
    return result;
  } catch (error) {
    throw new HttpError('DB payment request failed', 400);
  }
}
// function to verify the payment before cancel
function isPaymentWithPay(payment: any): payment is { pay: { receipt: string; agrmid: number; recordid: number } } {
  return (
    payment !== null &&
    'pay' in payment &&
    ['receipt', 'agrmid', 'recordid'].every((el) => el in payment.pay) &&
    'string' === typeof payment.pay.receipt &&
    'number' === typeof payment.pay.agrmid &&
    'number' === typeof payment.pay.recordid
  );
}
// Utility to handle common status update logic
async function handlePaymentStatusUpdate(remotePayment: BankRequest, localPayment: StoredPayment): Promise<void> {
  const { AUTHORIZED, CONFIRMED, REFUNDED, REJECTED } = PaymentStatus;
  const { NEW: NEW_NUMERIC, CONFIRMED: CONFIRMED_NUMERIC, REJECTED: REJECTED_NUMERIC } = PaymentStatusNumeric;

  switch (remotePayment.Status) {
    case AUTHORIZED:
      // No action for AUTHORIZED
      break;
    case CONFIRMED:
      if (NEW_NUMERIC === localPayment.status_id) {
        // gets variables to register online check
        const { phone, email, amount, operid, payment_id, agrmid } = localPayment
        // converts amount back from kopecks into rubles
        const rublesAmount = amount / 100;
        // sends payment to tax service to register online check
        const receipt = await registerReceipt({
          clientContact: phone || email,
          amount: rublesAmount,
          operId: operid,
        });
        // creates an instance of soap client to send payment to billing
        const soap = await initSoapClient();
        // send payment to billing via soap request
        await soap.submitPayment({
          amount: rublesAmount,
          receipt: payment_id,
          agrmid: agrmid,
          comment: receipt.receipt_url || '',
        });
        // updates local payment status and check url
        Promise.all([
          dbClient.updatePaymentStatus(`${remotePayment.PaymentId}`, CONFIRMED_NUMERIC),
          dbClient.updatePaymentTaxReceipt(`${remotePayment.PaymentId}`, receipt.receipt_url)
        ])
      }
      break;
    case REFUNDED:
      if (CONFIRMED_NUMERIC === localPayment.status_id) {
        const soap = await initSoapClient();
        const payment = await soap.getExactPaymentByReceipt(localPayment.payment_id);
        if (isPaymentWithPay(payment)) {
          const { receipt, agrmid, recordid } = payment.pay;
          await soap.cancelPayment({
            receipt,
            agrmid,
            recordid,
          });
        }
        await dbClient.updatePaymentStatus(`${remotePayment.PaymentId}`, PaymentStatusNumeric.REFUNDED);
      }
      break;
    case REJECTED:
      if (NEW_NUMERIC === localPayment.status_id) {
        await dbClient.updatePaymentStatus(`${remotePayment.PaymentId}`, REJECTED_NUMERIC);
      }
      break;
  }
}

// POST controller
export const tbankPostController = async function (req: Request, res: Response) {
  try {
    console.log(req.body);
    // Validate the request body and ensure it meets expected format
    isBankRequest(req.body);
    // Extract remote payment data from the request body
    const remotePayment = req.body;
    // Fetch the corresponding payment record from the local database
    const localPayment = await fetchLocalPayment(`${remotePayment.PaymentId}`);
    // Compare local and remote payment details to ensure they match
    compareLocalAndRemotePayment(localPayment, remotePayment);
    // Process payment status updates based on the remote payment status
    await handlePaymentStatusUpdate(remotePayment, localPayment);
    // Send a successful response to the tbank system
    res.status(200).send('OK');
  } catch (error) {
    console.log(error);
    // Handle known errors (HttpError) and send appropriate status codes
    if (error instanceof HttpError) {
      res.status(error.httpStatusCode).send(error.message);
    } else {
      // Handle unexpected errors and send a generic internal server error
      res.status(500).send('Internal unexpected server error');
    }
  }
};
