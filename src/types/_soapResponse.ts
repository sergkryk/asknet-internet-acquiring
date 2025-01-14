export type RetItem = {
  ret: any[];
};
export type SoapEnvelope = string;
export type SoapAPIResponse = [
  RetItem,
  SoapEnvelope,
  SoapEnvelope | undefined,
  SoapEnvelope | undefined,
  SoapEnvelope | undefined
];

const isRetArray = function (obj: any): obj is RetItem {
  return typeof obj === "object" && obj !== null && Array.isArray(obj.ret);
};
const isSoapEnvelope = function (obj: any): obj is SoapEnvelope {
  return typeof obj === "string" && obj.trim().startsWith("<?xml");
};

export const isSoapAPIResponse = function (obj: any): obj is SoapAPIResponse {
  return (
    Array.isArray(obj) &&
    obj.length === 5 &&
    isRetArray(obj[0]) &&
    isSoapEnvelope(obj[1]) &&
    (obj[2] === undefined || isSoapEnvelope(obj[2])) &&
    (obj[3] === undefined || isSoapEnvelope(obj[3])) &&
    (obj[4] === undefined || isSoapEnvelope(obj[4]))
  );
};
