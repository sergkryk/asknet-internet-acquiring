import { Operators } from "../../utils/token";

export enum PaymentStatus {
  NEW = 'NEW',
  AUTHORIZED = 'AUTHORIZED',
  CONFIRMED = 'CONFIRMED',
  REFUNDED = 'REFUNDED',
  REJECTED = 'REJECTED',
}
export interface BankRequestCandidate {
  OperId: Operators,
  [key: string]: number | string | boolean | {}
}
export interface IPaymentRequestBody extends BankRequestCandidate {
  Amount: number;
  OrderId: string;
}
// Interface to validate bank response structure
export interface InitNewPaymentResponse {
  Success: boolean,
  ErrorCode: string,
  TerminalKey: string,
  Status: PaymentStatus,
  PaymentId: string,
  OrderId: string,
  Amount: number,
  PaymentURL: string
}