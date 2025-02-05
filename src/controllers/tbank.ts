import { NextFunction, Request, Response } from "express";
import { verifyRequestToken } from "../utils/token";
import { dbClient, PaymentStatusNumeric, StoredPayment } from "../services/db/db-client";
import NodeSoap from "../soap/soap";
import { PaymentStatus } from "../services/tpayments/tpayments";

// class to handle http errors
class HttpError extends Error {
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
};
// function to check if the request body is a BankRequest
function isBankRequest(request: any): void {
  const checks = [
    typeof request === "object",
    request !== null,
    typeof request.TerminalKey === "string",
    typeof request.OrderId === "string",
    typeof request.Success === "boolean",
    typeof request.Status === "string",
    typeof request.PaymentId === "number",
    typeof request.ErrorCode === "string",
    typeof request.Amount === "number",
    typeof request.CardId === "number",
    typeof request.Pan === "string",
    typeof request.ExpDate === "string",
    typeof request.Token === "string"
  ]
  if (!checks.every(check => check)) {
    const error = new HttpError("Invalid request body", 400);
    throw error;
  };
}
// function to check if token is valid
function isTokenValid(bankRequest: BankRequest): void {
  if (!verifyRequestToken(bankRequest)) {
    const error = new HttpError("Invalid request token", 400);
    throw error;
  }
}
// function to compare local and remote payment
function compareLocalAndRemotePayment(localPayment: StoredPayment, remotePayment: BankRequest): void {
  if (localPayment.amount !== remotePayment.Amount) {
    throw new HttpError("Amount mismatch", 400);
  }
  if (Number(localPayment.payment_id) !== remotePayment.PaymentId) {
    throw new HttpError("Payment ID mismatch", 400);
  }
}
// function to init and auth soap client
async function initSoapClient(): Promise<NodeSoap> {
  if (!process.env.BILLING_LOGIN || !process.env.BILLING_PASSWORD) {
    throw new Error("Billing login or password is not set");
  }
  const soap = await NodeSoap.init();
  await soap.login({
    login: process.env.BILLING_LOGIN,
    pass: process.env.BILLING_PASSWORD
  });
  return soap;
}
// function to fetch local payment
async function fetchLocalPayment(paymentId: string): Promise<StoredPayment> {
  const result = await dbClient.getPayment(paymentId);
  if (result === null) {
    throw new HttpError("Payment not found", 400);
  }
  return result;
}

// POST controller
export const tbankPostController = async function (
  req: Request,
  res: Response
) {
  try {
    console.log('req.body', req.body);
    isBankRequest(req.body);
    isTokenValid(req.body);
    const remotePayment = req.body;
    const localPayment = await fetchLocalPayment(`${remotePayment.PaymentId}`);
    compareLocalAndRemotePayment(localPayment, remotePayment);
    const { AUTHORIZED, CONFIRMED, REFUNDED, REJECTED } = PaymentStatus;
    switch (remotePayment.Status) {
      case AUTHORIZED:
        // do nothing, authorized status is ignored
        break;
      case CONFIRMED:
        // check if local payment has new status
        if (PaymentStatusNumeric.NEW === localPayment.status_id) {
          // init soap client
          const soap = await initSoapClient();
          // submit payment to billing
          const confirmedPaymentRecordId = await soap.submitPayment({
            amount: remotePayment.Amount,
            receipt: `${remotePayment.PaymentId}`,
            agrmid: localPayment.agrmid,
          });
          // update local payment status
          await dbClient.updatePaymentStatus(`${remotePayment.PaymentId}`, PaymentStatusNumeric.CONFIRMED);
        }
        break;
      case REFUNDED:
        if (PaymentStatusNumeric.CONFIRMED === localPayment.status_id) {
          // TODO: write function to refund payment from billing
          await dbClient.updatePaymentStatus(`${remotePayment.PaymentId}`, PaymentStatusNumeric.REFUNDED);
        }
        break;
      case REJECTED:
        if (PaymentStatusNumeric.NEW === localPayment.status_id) {
          await dbClient.updatePaymentStatus(`${remotePayment.PaymentId}`, PaymentStatusNumeric.REJECTED);
        }
        break;
    }
    res.status(200).send("OK");
  } catch (error) {
    if (error instanceof HttpError) {
      console.log('error', error);
      res.status(error.httpStatusCode).send(error.message);
    } else {
      console.log('error', error);
      res.status(500).send("Internal server error");
    }
  }
};


