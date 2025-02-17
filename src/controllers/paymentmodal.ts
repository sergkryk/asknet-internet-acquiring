import { NextFunction, Request, Response } from 'express';
import { dbClient } from '../services/db/db-client';
import { HttpError } from '../utils/errorHadler';

// validates request body
function validateBody(candidate: any) {
	return (
		typeof candidate === 'object' &&
		candidate !== null &&
		'status' in candidate &&
		'amount' in candidate &&
		'paymentId' in candidate &&
		typeof candidate.status === 'boolean' &&
		typeof candidate.amount === 'string' &&
		typeof candidate.paymentId === 'string'
	);
}
// POST controller
const modalControllerConstructor = function () {
	const shownPaymentIdSet: Set<string> = new Set();
	const maxSize = 10000; // max set size
	let counter = 0; // counter fo max paymentIdSet size

	const resetSetIfNeeded = () => {
		if (counter >= maxSize) {
			shownPaymentIdSet.clear(); // Clear Set
			counter = 0; // reset counter
		}
	};

	const controller = async function (req: Request, res: Response, next: NextFunction) {
		try {
			if (!validateBody(req.body)) {
				throw new HttpError(`Wrong request body format`, 400); // validates request body
			}
			const { paymentId } = req.body; // declares payment id from body
			resetSetIfNeeded(); // periodical checking and clearing
			if (shownPaymentIdSet.has(paymentId)) {
				return res.status(200).json({ status: 'shown' }); // tells frontend that message was already shown
			}
			const payment = await dbClient.getPayment(paymentId); // retrieves payment from db by id
			if (payment === null) {
				throw new HttpError(`Payment with ID ${paymentId} not found`, 400); // if no such payment throws an error
			}
			const { amount, receipt_url } = payment; // declares variables for modal
			shownPaymentIdSet.add(paymentId); // adds id to set not to show modal again
			counter++; // increases counter to prevent max size exeeding
			res.status(200).json({ amount, paymentId, receipt_url }); // sends json to frontend
		} catch (error) {
			next(error);
		}
	};
	return controller;
};

export const paymentModalController = modalControllerConstructor();
