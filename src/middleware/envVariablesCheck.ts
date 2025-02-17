import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../utils/errorHadler';

const requiredEnvVars = [
	'ASKNET_TERMINAL_KEY',
	'ASKNET_TERMINAL_PASS',
	'MULTINET_TERMINAL_KEY',
	'MULTINET_TERMINAL_KEY',
	'TPAYMENTS_URL',
	'DB_USER',
	'DB_HOST',
	'DB_NAME',
	'DB_PASSWORD',
	'DB_PORT',
	'BILLING_URL',
	'BILLING_LOGIN',
	'BILLING_PASSWORD',
	'ASKNET_OPENCLIENT_APP_ID',
	'ASKNET_OPENCLIENT_SECRET',
	'MULTINET_OPENCLIENT_APP_ID',
	'MULTINET_OPENCLIENT_SECRET',
];

function validateEnvVars(): void {
	const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);
	if (missingVars.length > 0) {
		throw new HttpError(`Missing required environment variables: ${missingVars.join(', ')}`, 500);
	}
}

export function envValidationMiddleware(req: Request, res: Response, next: NextFunction): void {
	try {
		validateEnvVars();
		next();
	} catch (error) {
		next(error);
	}
}
