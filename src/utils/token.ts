import { BankRequest } from "../controllers/tbank";

const crypto = require("crypto");

const password = process.env.TBANK_PASSWORD;

export const getToken = function (data: { [key: string]: string | boolean | number }): string {
  const dataWithPassword = { ...data, Password: password };
  const sortedKeys = Object.keys(dataWithPassword).sort() as Array<
    keyof typeof dataWithPassword
  >;
  const concatenatedValues = sortedKeys
    .map((key) => dataWithPassword[key])
    .join("");
  const hash = crypto
    .createHash("sha256")
    .update(concatenatedValues, "utf8")
    .digest("hex");
  return hash;
};

export const verifyRequestToken = function (request: BankRequest): boolean {
  const { Token, ...rest} = request;
  console.log(rest);
  const verifiedToken = getToken(rest);
  return verifiedToken === Token;
};

