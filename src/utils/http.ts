import { BankRequestCandidate } from "../services/tpayments/types";
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
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error making POST request:', error);
  }
};

// general function to make post requests and sign it with token
export const postJsonWithToken = async function (
  url: string,
  data: BankRequestCandidate
) {
  const dataWithToken = getToken(data);
  const response = await postJson(url, dataWithToken);
  return response;
};
