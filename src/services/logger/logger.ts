import fs from 'fs';
import path from 'path';

// Define log file path
const logFilePath = path.join(__dirname, 'logs', 'app.log');

// Ensure log directory exists
fs.mkdirSync(path.dirname(logFilePath), { recursive: true });

// Simple function to append logs to a file
function logToFile(message: string): void {
	const timestamp = new Date().toISOString();
	const logMessage = `[${timestamp}] ${message}\n`;
	fs.appendFileSync(logFilePath, logMessage);
}

// Simple middleware to log incoming requests
export const logRequest = (req: any, res: any, next: Function): void => {
	const body = req.method === 'POST' ? JSON.stringify(req.body) : '';
	const logMessage = `Request: ${req.method} ${req.url}${body ? ' - ' + body : ''}`;
	logToFile(logMessage);
	next(); // Proceed to the next middleware
};

// Simple middleware to log errors
export const logError = (err: any): void => {
	const logMessage = `Error: ${err.message} - ${err.stack}`;
	logToFile(logMessage);
};
