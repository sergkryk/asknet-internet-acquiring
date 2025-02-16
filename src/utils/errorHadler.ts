import { logError } from '../services/logger/logger';
import { Response, Request, NextFunction } from 'express';

// class to handle http errors
export class HttpError extends Error {
	httpStatusCode: number;
	constructor(message: string, httpStatusCode: number) {
		super(message);
		this.httpStatusCode = httpStatusCode;
	}
}

// handle errors
export function handleErrors(err: any, req: Request, res: Response, next: NextFunction): void {
	if (err instanceof HttpError) {
		res.status(err.httpStatusCode).send(err.message);
	} else if (err instanceof Error) {
		res.status(500).send(err.message);
	} else {
		res.status(500).send('An unexpected error occurred. Please try again later.');
	}
	const message = err instanceof Error ? err.message : 'Unknown error';
	logError(err);
	console.error('Error occurred with message: ', message);
}
