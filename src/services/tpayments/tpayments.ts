import { postJsonWithToken } from '../../utils/http';
import { InitNewPaymentResponse, IPaymentRequestBody, PaymentStatus } from './types';

// url to init Tbank payment
const URL = process.env.TPAYMENTS_URL || 'https://securepay.tinkoff.ru/v2/Init';
// Function to validate bank response structure
function isInitNewPaymentResponse(response: any): response is InitNewPaymentResponse {
  return (
    typeof response.Success === 'boolean' &&
    typeof response.ErrorCode === 'string' &&
    typeof response.TerminalKey === 'string' &&
    typeof response.Status === 'string' &&
    typeof response.PaymentId === 'string' &&
    typeof response.OrderId === 'string' &&
    typeof response.Amount === 'number' &&
    typeof response.PaymentURL === 'string' &&
    PaymentStatus[response.Status as keyof typeof PaymentStatus] !== undefined
  );
}
// Function to check if payment initialization was successful
function isInitSuccessful(response: any): response is InitNewPaymentResponse {
  return response.Success === true;
}
// Function to initialize payment
export const initPayment = async function (paymentRequestBody: IPaymentRequestBody): Promise<InitNewPaymentResponse> {
  const initRequest = await postJsonWithToken(URL, paymentRequestBody);
  if (isInitNewPaymentResponse(initRequest) && isInitSuccessful(initRequest)) {
    return initRequest;
  } else {
    throw new Error('Init payment failed or not successful');
  }
};
