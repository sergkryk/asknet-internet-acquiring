import { postJsonWithToken } from "../../utils/http";
import { Operators } from "../../utils/token";

const URL = process.env.TPAYMENTS_URL || "https://securepay.tinkoff.ru/v2/Init";
export enum PaymentStatus {
  NEW = 'NEW',
  AUTHORIZED = 'AUTHORIZED',
  CONFIRMED = 'CONFIRMED',
  REFUNDED = 'REFUNDED',
  REJECTED = 'REJECTED',
}
export interface BankRequestCandidate {
  OperId: Operators,
  [key: string]: number | string | boolean 
}

export interface IPaymentRequestBody extends BankRequestCandidate {
  Amount: number; // Required, max 10 characters
  OrderId: string; // Required, max 36 characters
}
// Interface to validate bank response structure
interface InitNewPaymentResponse {
  Success: boolean,
  ErrorCode: string,
  TerminalKey: string,
  Status: PaymentStatus,
  PaymentId: string,
  OrderId: string,
  Amount: number,
  PaymentURL: string
}
// Function to validate bank response structure
function isInitNewPaymentResponse(response: any): response is InitNewPaymentResponse {
  return (
    typeof response.Success === "boolean" &&
    typeof response.ErrorCode === "string" &&
    typeof response.TerminalKey === "string" &&
    typeof response.Status === "string" &&
    typeof response.PaymentId === "string" &&
    typeof response.OrderId === "string" &&
    typeof response.Amount === "number" &&
    typeof response.PaymentURL === "string" &&
    PaymentStatus[response.Status as keyof typeof PaymentStatus] !== undefined
  );
}
// Function to check if payment initialization was successful
function isInitSuccessful(response: any): response is InitNewPaymentResponse {
  return response.Success === true;
}
// Function to initialize payment
export const initPayment = async function (paymentRequestBody: IPaymentRequestBody): Promise<InitNewPaymentResponse> {
  console.log(paymentRequestBody)
  const initRequest = await postJsonWithToken(URL, paymentRequestBody);
  if (isInitNewPaymentResponse(initRequest) && isInitSuccessful(initRequest)) {
    return initRequest
  } else {
    throw new Error("Init payment failed or not successful");
  }
};
