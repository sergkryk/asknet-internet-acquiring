import { Operators } from '../../utils/token';
import { PaymentStatus } from '../tpayments/types';

export const PaymentStatusNumeric: Record<PaymentStatus, number> = {
  [PaymentStatus.NEW]: 1,
  [PaymentStatus.AUTHORIZED]: 2,
  [PaymentStatus.CONFIRMED]: 3,
  [PaymentStatus.REFUNDED]: 4,
  [PaymentStatus.REJECTED]: 5,
};
// Define a type that only allows values from PaymentStatusNumeric
export type PaymentStatusIds = (typeof PaymentStatusNumeric)[PaymentStatus];
export interface PaymentData {
  AgrmId: number;
  Success: boolean;
  ErrorCode: string;
  TerminalKey: string;
  Status: PaymentStatus;
  PaymentId: string;
  OrderId: string;
  Amount: number;
  PaymentURL: string;
  OperId: Operators;
  phone: string;
  email: string;
}
export interface StoredPayment {
  agrmid: number;
  success: boolean;
  error_code: string;
  terminal_key: string;
  status_id: PaymentStatusIds;
  payment_id: string;
  order_id: string;
  amount: number;
  payment_url: string;
  email: string;
  phone: string;
  operid: Operators;
  receipt_url: string
}
export function isStoredPayment(data: any): data is StoredPayment {
  if (typeof data !== 'object' || data === null) {
    return false;
  }
  const checks = [
    typeof data.agrmid === 'number',
    typeof data.success === 'boolean',
    typeof data.error_code === 'string',
    typeof data.terminal_key === 'string',
    typeof data.status_id === 'number',
    typeof data.payment_id === 'string',
    typeof data.order_id === 'string',
    typeof data.amount === 'number',
    typeof data.payment_url === 'string',
  ];
  return checks.every((check) => check);
}
