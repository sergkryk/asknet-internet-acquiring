import { Request, Response } from "express";
import { BankRequestCandidate, initPayment, IPaymentRequestBody } from "../services/tpayments/tpayments";
import { dbClient } from "../services/db/db-client";
import { HttpError } from "./tbank";

// Interface for the payment request body
interface IPaymentBody extends BankRequestCandidate {
  AgrmId: number;
  Amount: number;
}
// Validate the payment request body
function isPaymentBodyValid(body: any): body is IPaymentBody {
  return (
    typeof body.AgrmId === "number" &&
    typeof body.OperId === "number" &&
    typeof body.Amount === "number" &&
    body.Amount >= 100 && body.Amount <= 10000
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
      // convert rubles into kopecks as Tbank API requires 
      Amount: Math.floor(Number(Amount)*100),
      OrderId: generateOrderId(AgrmId),
      OperId
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
    console.log(error)
    // Handle known errors (HttpError) and send appropriate status codes
    if (error instanceof HttpError) {
      res.status(error.httpStatusCode).send(error.message);
    } else {
      // Handle unexpected errors and send a generic internal server error
      res.status(500).send("An unexpected error occurred. Please try again later.");
    }
  }
};


