import { Request, Response } from "express";
import { initPayment, IPaymentRequestBody } from "../services/tpayments/tpayments";
import { dbClient } from "../services/db/db-client";

interface IPaymentBody {
  AgrmId: number;
  OperId: number;
  Amount: number;
}

const asknet = process.env.TERMINAL_KEY_4016 || "";
const multinet = process.env.TERMINAL_KEY_3743 || "";

const operatorTerminalKeys: Record<number, string> = {
  4016: asknet,
  3743: multinet,
}

// Get the terminal key for the operator
function getOperatorTerminalKey(operid: number): string {
  if (!asknet || !multinet) {
    throw new Error("Terminal keys not found");
  }
  if (operatorTerminalKeys[operid]) {
    return operatorTerminalKeys[operid];
  }
  throw new Error(`Terminal key for operator ${operid} not found`);
}

// Check if the request body is valid
function isPaymentBodyValid(body: any): body is IPaymentBody {
  const checks = [
    typeof body.AgrmId === "number",
    typeof body.OperId === "number",
    typeof body.Amount === "number",
    (body.Amount > 100 && body.Amount < 10000),
    body.OperId in operatorTerminalKeys
  ]
  return checks.every(el => el);
}

// Generate a unique order ID for the payment max 36 characters
function generateOrderId(agrmid: number): string {
  return `${agrmid}-${Date.now()}`.slice(0, 36);
}

// POST controller
export const paymentController = async function (
  req: Request,
  res: Response
) {
  try {
    if (isPaymentBodyValid(req.body)) {
      const { Amount, AgrmId, OperId } = req.body;
      const PaymentRequestBody: IPaymentRequestBody = {
        Amount,
        OrderId: generateOrderId(AgrmId),
        TerminalKey: getOperatorTerminalKey(OperId)
      }
      const newPayment = await initPayment(PaymentRequestBody);
      await dbClient.insertPayment({...newPayment, AgrmId});
      return res.status(200).json({
        paymentUrl: newPayment.PaymentURL
      });
    } else {
      return res.status(400).json({
        error: "Invalid request body format"
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: "Payment processing failed"
    });
  }
};


