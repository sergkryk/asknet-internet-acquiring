import crypto from 'crypto';
import { PrintCheckCommand, PrintCheckResponse, RegisterReceiptPayload } from './types';
import { Operators } from '../../utils/token';
import { isValidEmail, isValidPhone } from '../../utils/validators';
import { phoneNumberFormatter } from '../../utils/prettier';
import { HttpError } from '../../utils/errorHadler';
// open API url
const OpenApiUrl: string = process.env.OPENCLIENT_URL!;
// Static headers
const headers = new Headers({
  Accept: 'application/json',
  'Content-Type': 'application/json',
});
// Operators' appIds and secrets
const operatorsAppIdAndSecret: Record<Operators, { appId: string; secret: string }> = {
  4016: {
    appId: process.env.ASKNET_OPENCLIENT_APP_ID!,
    secret: process.env.ASKNET_OPENCLIENT_SECRET!,
  },
  3743: {
    appId: process.env.MULTINET_OPENCLIENT_APP_ID!,
    secret: process.env.MULTINET_OPENCLIENT_SECRET!,
  },
};
// Utility functions to get AppId and Secret for an operator
function getOperatorAppIdAndSecret(operid: Operators): {
  appId: string;
  secret: string;
} {
  const operator = operatorsAppIdAndSecret[operid];
  if (!operator) {
    throw new HttpError(`Operator with ID ${operid} not found.`, 400);
  }
  return operator;
}
// Command structure for printing a receipt
const getPrintCheckCommand = (smsEmail54FZ: string, sum: number, isCashless: boolean): PrintCheckCommand => ({
  goods: [
    {
      name: 'Услуги связи',
      price: sum,
      count: 1,
      sum,
      nds_not_apply: true,
      item_type: 4,
      payment_mode: 4,
    },
  ],
  author: 'Крюков Сергей Николаевич',
  tag1055: '2',
  smsEmail54FZ,
  payed_cash: !isCashless ? sum : 0,
  payed_cashless: isCashless ? sum : 0,
  payed_credit: 0,
  payed_prepay: 0,
  payed_consideration: 0,
});
// Generates random nonce
function getNonce(length: number = 16): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let nonce = '';
  for (let i = 0; i < length; i++) {
    nonce += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return nonce;
}
// Makes signature for headers from a command body
function getSignedHeaders(commandBody: Record<string, any>, secret: string) {
  // Sorts keys of command alphabetically
  const sortedCommandKeys = Object.keys(commandBody).sort();
  // Creates sorted version of command
  const sortedCommand: Record<string, any> = {};
  sortedCommandKeys.forEach((key) => {
    sortedCommand[key] = commandBody[key];
  });
  // Makes a string from alphabetically sorted object
  const commandString = JSON.stringify(sortedCommand);
  // Creates signature
  const sign = crypto
    .createHash('md5')
    .update(commandString + secret)
    .digest('hex');
  headers.append('sign', sign);
  return headers;
}
// Adds appId and nonce to commandBody
function buildPrintCheckCommand(appId: string, commandBody: {}): Record<string, any> {
  return {
    type: 'printCheck',
    app_id: appId,
    nonce: getNonce(),
    command: commandBody,
  };
}
// Checks payload before registering receipt
function isRegisterReceiptPayload(payload: Record<string, unknown>): payload is RegisterReceiptPayload {
  return (
    typeof payload === 'object' &&
    payload !== null &&
    'amount' in payload &&
    'clientContact' in payload &&
    'operId' in payload &&
    typeof payload.amount === 'number' &&
    typeof payload.clientContact === 'string' &&
    typeof payload.operId === 'number'
  );
}
// Verifies and formats contact phone or email
function verifyContactType(clientContact: string): string {
  if (isValidEmail(clientContact)) {
    return clientContact;
  } else if (isValidPhone(clientContact)) {
    return phoneNumberFormatter(clientContact);
  } else {
    return clientContact;
  }
}
// Register receipt function
export const registerReceipt = async function (payload: RegisterReceiptPayload): Promise<PrintCheckResponse> {
  // check payload
  if (!isRegisterReceiptPayload(payload)) {
    throw new HttpError('Cannot register receipt with this payloads!', 400);
  }
  // destructures payload to get variables
  const { amount, clientContact, operId } = payload
  // selects operator variables based on operId
  const { appId, secret } = getOperatorAppIdAndSecret(operId)
  // verifies what contact type is and formats it if needed
  const verifiedContact = verifyContactType(clientContact)
  // gets command for receipt
  const command = buildPrintCheckCommand(
    appId,
    getPrintCheckCommand(verifiedContact, amount, true)
  );
  console.log('command', command);
  // signs headers
  const headers = getSignedHeaders(command, secret);
  // prints check request
  console.log('headers', headers);
  try {
    const request = await fetch(`${OpenApiUrl}Command`, {
      method: 'POST',
      headers,
      body: JSON.stringify(command),
    });
    if (request.ok) {
      const responseData = await request.json();
      console.log('responseData', responseData);
      return responseData;
    } else {
      console.log('request', request);
      const dt = await request.json()
      console.log('dt', dt);
      throw new HttpError('Something is wrong when registering receipt!', 500);
    }
  } catch (error) {
    throw new HttpError('Receipt registration failed!', 500);
  }
};
