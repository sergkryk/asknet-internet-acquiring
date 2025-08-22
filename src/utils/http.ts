import { BankRequestCandidate } from "../services/tpayments/types";
import { HttpError } from "./errorHadler";
import { getToken } from "./token";


// general function to make post requests
export const postJson = async function (
  url: string,
  data: any
) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new HttpError(`HTTP error! status: ${response.status}`, 500);
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error occured'
    throw new HttpError(message, 400)
  }
};

// general function to make post requests and sign it with token
export const postJsonWithToken = async function (
  url: string,
  data: BankRequestCandidate
) {
  const dataWithToken = getToken(data);
  console.log(dataWithToken)
  const response = await postJson(url, dataWithToken);
  console.log(response)
  return response;
};
