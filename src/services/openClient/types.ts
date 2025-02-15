import { Operators } from "../../utils/token";

export type PrintCheckItem = {
  name: string;
  price: number;
  count: number;
  sum: number;
  nds_not_apply: boolean;
  item_type: number;
  payment_mode: number;
};

export type PrintCheckCommand = {
  goods: PrintCheckItem[];
  author: string;
  tag1055: string;
  smsEmail54FZ: string;
  payed_cash: number;
  payed_cashless: number;
  payed_credit: number;
  payed_prepay: number;
  payed_consideration: number;
};

export type PrintCheckResponse = {
  command_id: number;
  receipt_url: string;
};

export type OpenClientRequest = {
  nonce: string;
  [keys: string]: any;
};

export type RegisterReceiptPayload = {
  amount: number;
  clientContact: string;
  operId: Operators;
};
