import { Request, Response } from "express";
import { verifyRequestToken } from "../utils/token";
import { dbClient, PaymentStatusNumeric } from "../services/db/db-client";

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
function isBankRequest(body: any): body is BankRequest {
  if (typeof body !== "object" || body === null) {
    return false;
  }
  const checks = [
    typeof body.TerminalKey === "string",
    typeof body.OrderId === "string",
    typeof body.Success === "boolean",
    typeof body.Status === "string",
    typeof body.PaymentId === "number",
    typeof body.ErrorCode === "string",
    typeof body.Amount === "number",
    typeof body.CardId === "number",
    typeof body.Pan === "string",
    typeof body.ExpDate === "string",
    typeof body.Token === "string"
  ]
  return checks.every(check => check);
}

// POST controller
export const tbankPostController = async function (
  req: Request,
  res: Response
) {
  const body = req.body;

  if (!isBankRequest(body)) {
    res.status(400).send("Invalid request body");
    return;
  }

  if (!verifyRequestToken(body)) {
    res.status(400).send("Invalid request token");
    return;
  }

  const { Status, PaymentId, Amount } = body;
  const payment = await dbClient.getPayment(`${PaymentId}`);

  if (!payment) {
    res.status(400).send("Payment not found");
    return;
  }

  if (Amount !== payment.amount) {
    res.status(400).send("Amount mismatch");
    return;
  }

  switch (Status) {
    case "AUTHORIZED":
      break;
    case "CONFIRMED":
      if (PaymentStatusNumeric.NEW === payment.status_id) {
        // TODO: write function to add payment to billing
        await dbClient.updatePaymentStatus(`${PaymentId}`, PaymentStatusNumeric.CONFIRMED);
      }
      break;
    case "REFUNDED":
      if (PaymentStatusNumeric.CONFIRMED === payment.status_id) {
        // TODO: write function to refund payment from billing
        await dbClient.updatePaymentStatus(`${PaymentId}`, PaymentStatusNumeric.REFUNDED);
      }
      break;
    case "REJECTED":
      if (PaymentStatusNumeric.NEW === payment.status_id) {
        await dbClient.updatePaymentStatus(`${PaymentId}`, PaymentStatusNumeric.REJECTED);
      }
      break;
  }
  res.status(200).send("OK");
};


