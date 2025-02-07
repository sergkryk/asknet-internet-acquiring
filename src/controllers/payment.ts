import { Request, Response } from "express";
import { initPayment, IPaymentRequestBody } from "../services/tpayments/tpayments";
import { dbClient } from "../services/db/db-client";
import { HttpError } from "./tbank";

// Interface for the payment request body
interface IPaymentBody {
  AgrmId: number;
  OperId: number;
  Amount: number;
}
// Terminal keys for operators
const operatorTerminalKeys: Record<number, string> = {
  4016: process.env.TERMINAL_KEY_4016 || "",
  3743: process.env.TERMINAL_KEY_3743 || ""
};
// Get the terminal key for the operator, throws an error if not found
function getOperatorTerminalKey(operid: number): string {
  const terminalKey = operatorTerminalKeys[operid];
  if (!terminalKey) {
    throw new HttpError(`Terminal key for operator ${operid} not found`, 400);
  }
  return terminalKey;
}
// Validate the payment request body
function isPaymentBodyValid(body: any): body is IPaymentBody {
  return (
    typeof body.AgrmId === "number" &&
    typeof body.OperId === "number" &&
    typeof body.Amount === "number" &&
    body.Amount > 10000 && body.Amount < 1000000 &&
    body.OperId in operatorTerminalKeys
  );
}
// Generate a unique order ID for the payment ( max 36 characters )
function generateOrderId(agrmid: number): string {
  return `${agrmid}-${Date.now()}`.slice(0, 36);
}
// POST controller
export const paymentController = async function (req: Request, res: Response) {
  try {
    // Validate the payment request body
    if (!isPaymentBodyValid(req.body)) {
      throw new HttpError("Invalid request body format", 400)
    }
    // Destructure the request body
    const { Amount, AgrmId, OperId } = req.body;
    // Create the payment request body
    const PaymentRequestBody: IPaymentRequestBody = {
      Amount,
      OrderId: generateOrderId(AgrmId),
      TerminalKey: getOperatorTerminalKey(OperId)
    }
    // Initialize the payment with Tbank remote server
    const newPayment = await initPayment(PaymentRequestBody);
    // Store payment copy to local db with AgrmId for further payment processing 
    await dbClient.insertPayment({ ...newPayment, AgrmId });
    // Return the payment URL in the response
    return res.status(200).json({
      paymentUrl: newPayment.PaymentURL
    });
  } catch (error) {
    // Handle known errors (HttpError) and send appropriate status codes
    if (error instanceof HttpError) {
      res.status(error.httpStatusCode).send(error.message);
    } else {
      // Handle unexpected errors and send a generic internal server error
      res.status(500).send("An unexpected error occurred. Please try again later.");
    }
  }
};


