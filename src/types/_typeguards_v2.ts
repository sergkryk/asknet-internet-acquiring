import { GetAccountItem } from "./getAccount";
import { GetAccountsItem } from "./getAccounts";
import { GetTarifResponse, isGetTarifResponse } from "./getTarif";
import { isTarifItem, TarifItem } from "./getTarifs";
import { GetVgroupsItem, isGetVgroupsItem } from "./getVgroups";
import { isSoapAPIResponse, SoapEnvelope } from "./soapResponse";

type GetTarifsAPIResponse = [
  {
    ret: TarifItem[]
  },
  SoapEnvelope,
  SoapEnvelope | undefined,
  SoapEnvelope | undefined,
  SoapEnvelope | undefined
];
//публичная для проверки всего ответа GetTarifs
export const isGetTarifsAPIResponse = function(obj: any): obj is GetTarifsAPIResponse {
  return isSoapAPIResponse(obj) && obj[0].ret.every(isTarifItem);
}

type GetVgroupsAPIResponse = [
  {
    ret: GetVgroupsItem[]
  },
  SoapEnvelope,
  SoapEnvelope | undefined,
  SoapEnvelope | undefined,
  SoapEnvelope | undefined
]
// публичная для проверки всего ответа GetVgroups
export const isGetVgroupsAPIResponse = function(obj: any): obj is GetVgroupsAPIResponse {
  return isSoapAPIResponse(obj) && obj[0].ret.every(isGetVgroupsItem);
}

type GetTarifAPIResponse = [
  {
    ret: GetTarifResponse[]
  },
  SoapEnvelope,
  SoapEnvelope | undefined,
  SoapEnvelope | undefined,
  SoapEnvelope | undefined
]
// публичная для проверки всего ответа GetTarif
export const isGetTarifAPIResponse = function(obj: any): obj is GetTarifAPIResponse {
  return isSoapAPIResponse(obj) && obj[0].ret.every(isGetTarifResponse);
}

type GetAccountAPIResponse = [
  {
    ret: GetAccountItem[]
  },
  SoapEnvelope,
  SoapEnvelope | undefined,
  SoapEnvelope | undefined,
  SoapEnvelope | undefined
]
// публичная для проверки всего ответа GetAccount
export const isGetAccountAPIResponse = function(obj: any): obj is GetAccountAPIResponse {
  return true;
  // return isSoapAPIResponse(obj) && obj[0].ret.every(isGetTarifResponse);
}


type GetAccountsAPIResponse = [
  {
    ret: GetAccountsItem[]
  },
  SoapEnvelope,
  SoapEnvelope | undefined,
  SoapEnvelope | undefined,
  SoapEnvelope | undefined
]
// публичная для проверки всего ответа GetAccounts
export const isGetAccountsAPIResponse = function(obj: any): obj is GetAccountsAPIResponse {
  return true;
  // return isSoapAPIResponse(obj) && obj[0].ret.every(isGetTarifResponse);
}