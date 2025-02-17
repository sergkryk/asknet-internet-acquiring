import { Pool, PoolConfig } from 'pg';
import { isStoredPayment, PaymentData, PaymentStatusIds, PaymentStatusNumeric, StoredPayment } from './types';
import { HttpError } from '../../utils/errorHadler';

const poolConfig: PoolConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432', 10),
};
class DatabaseClient {
  private pool: Pool;
  constructor() {
    const requiredEnvVars = ['DB_USER', 'DB_HOST', 'DB_NAME', 'DB_PASSWORD'];
    requiredEnvVars.forEach((varName) => {
      if (!process.env[varName]) {
        throw new HttpError(`Cannot connect to database. Environment variable ${varName} is not set.`, 500);
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
      console.error('Error inserting payment:', err);
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

  async updatePaymentStatus(paymentId: string, status: PaymentStatusIds): Promise<StoredPayment> {
    const query = `UPDATE payments SET status_id = $1 WHERE payment_id = $2 RETURNING *`;
    const result = await this.pool.query(query, [status, paymentId]);
    return result.rows[0];
  }

  async updatePaymentTaxReceipt(paymentId: string, receiptUrl: string): Promise<StoredPayment> {
    const query = `UPDATE payments SET receipt_url = $1 WHERE payment_id = $2 RETURNING *`
    const result = await this.pool.query(query, [receiptUrl, paymentId]);
    return result.rows[0];
  }

  async close() {
    await this.pool.end();
  }
}

// Export a singleton instance
export const dbClient = new DatabaseClient();
