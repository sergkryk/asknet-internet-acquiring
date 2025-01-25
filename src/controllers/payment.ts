import { Request, Response } from "express";
import { initPayment } from "../services/tpayments/tpayments";
import { dbClient } from "../services/db/db-client";

interface IPaymentBody {
  AgrmId: number;
  TerminalKey: string;
  Amount: number;
}

function isPaymentBody(body: any): body is IPaymentBody {
  return typeof body.AgrmId === "number" && typeof body.TerminalKey === "string" && typeof body.Amount === "number";
}

// Generate a unique order ID for the payment max 36 characters
function orderIdGenerator(agrmid: number): string {
  return `${agrmid}-${Date.now()}`.slice(0, 36);
}

// POST controller
export const paymentController = async function (
  req: Request,
  res: Response
) {
  try {
    const body = req.body;
    if (!isPaymentBody(body)) {
      return res.status(400).json({
        error: "Invalid request body format"
      });
    }
    const newPayment = await initPayment({...body, OrderId: orderIdGenerator(body.AgrmId)});
    await dbClient.insertPayment({...newPayment, AgrmId: body.AgrmId});
    return res.status(200).json({
      paymentUrl: newPayment.PaymentURL
    });
  } catch (error) {
    console.error('Payment initialization failed:', error);
    return res.status(500).json({
      error: "Payment processing failed"
    });
  }
};


