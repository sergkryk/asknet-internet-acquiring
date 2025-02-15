import { Pool, PoolConfig } from "pg";
import { PaymentStatus } from "../tpayments/tpayments";
import { Operators } from "../../utils/token";

export const PaymentStatusNumeric: Record<PaymentStatus, number> = {
  [PaymentStatus.NEW]: 1,
  [PaymentStatus.AUTHORIZED]: 2,
  [PaymentStatus.CONFIRMED]: 3,
  [PaymentStatus.REFUNDED]: 4,
  [PaymentStatus.REJECTED]: 5,
};
// Define a type that only allows values from PaymentStatusNumeric
export type PaymentStatusIds = (typeof PaymentStatusNumeric)[PaymentStatus];
interface PaymentData {
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
}
function isStoredPayment(data: any): data is StoredPayment {
  if (typeof data !== "object" || data === null) {
    return false;
  }
  const checks = [
    typeof data.agrmid === "number",
    typeof data.success === "boolean",
    typeof data.error_code === "string",
    typeof data.terminal_key === "string",
    typeof data.status_id === "number",
    typeof data.payment_id === "string",
    typeof data.order_id === "string",
    typeof data.amount === "number",
    typeof data.payment_url === "string",
  ];
  return checks.every((check) => check);
}
const poolConfig: PoolConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432", 10),
};
class DatabaseClient {
  private pool: Pool;

  constructor() {
    const requiredEnvVars = ["DB_USER", "DB_HOST", "DB_NAME", "DB_PASSWORD"];

    requiredEnvVars.forEach((varName) => {
      if (!process.env[varName]) {
        throw new Error(
          `Cannot connect to database. Environment variable ${varName} is not set.`
        );
      }
    });

    this.pool = new Pool(poolConfig);
  }

  async insertPayment(data: PaymentData) {
    const query = `
            INSERT INTO payments (agrmid, success, error_code, terminal_key, status_id, payment_id, order_id, amount, payment_url, operid, phone, email)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *;
        `;
    const values = [
      data.AgrmId,
      data.Success,
      data.ErrorCode,
      data.TerminalKey,
      PaymentStatusNumeric[data.Status],
      data.PaymentId,
      data.OrderId,
      data.Amount,
      data.PaymentURL,
      data.OperId,
      data.phone,
      data.email,
    ];

    try {
      const result = await this.pool.query(query, values);
      return result.rows[0];
    } catch (err) {
      console.error("Error inserting payment:", err);
      throw err; // Re-throw to handle it in the service layer
    }
  }

  async getPayment(paymentId: string): Promise<StoredPayment | null> {
    const query = `SELECT * FROM payments WHERE payment_id = $1`;
    const result = await this.pool.query(query, [paymentId]);
    if (result.rows.length === 0 || !isStoredPayment(result.rows[0])) {
      return null;
    }
    return result.rows[0];
  }

  async updatePaymentStatus(
    paymentId: string,
    status: PaymentStatusIds
  ): Promise<StoredPayment> {
    const query = `UPDATE payments SET status_id = $1 WHERE payment_id = $2 RETURNING *`;
    const result = await this.pool.query(query, [status, paymentId]);
    return result.rows[0];
  }

  async close() {
    await this.pool.end();
  }
}

// Export a singleton instance
export const dbClient = new DatabaseClient();
