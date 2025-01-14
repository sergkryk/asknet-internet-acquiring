// import { Client, createClientAsync } from "soap";
// import path from "path";
// import { GetPaymentsProfile, PaymentArguments } from "../types/types";
// import {
//   isGetVgroupsUserInfo,
//   isNodeSoapLoginResponseHeaders,
//   isSoapResponse,
// } from "../types/typeguards";
// import { formatGetStatResponse } from "../utils/getStatFormatter";
// import { getVgroupPersonalInfo } from "../utils/getVgroupPersonalInfo";
// import {
//   isGetAccountAPIResponse,
//   isGetAccountsAPIResponse,
//   isGetTarifAPIResponse,
//   isGetTarifsAPIResponse,
//   isGetVgroupsAPIResponse,
// } from "../types/typeguards_v2";
// import { TarifItem } from "../types/getTarifs";
// import { GetTarifResponse } from "../types/getTarif";
// import { GetVgroupsItem } from "../types/getVgroups";
// import { GetAccountItem } from "../types/getAccount";
// import { GetAccountsItem } from "../types/getAccounts";

// export default class NodeSoap {
//   public client: Client;
//   constructor(client: Client) {
//     this.client = client;
//   }
//   static async init(): Promise<NodeSoap> {
//     try {
//       const client: Client = await createClientAsync(
//         path.join(path.dirname(__dirname), "api3.wsdl"),
//         { endpoint: process.env.BILLING_URL }
//       );
//       return new NodeSoap(client);
//     } catch (error) {
//       throw new Error("Soap client initialization failed");
//     }
//   }
//   async managerLogin() {
//     await this.client.LoginAsync({
//       login: process.env.BILLING_LOGIN,
//       pass: process.env.BILLING_PASS,
//     });
//     if (!isNodeSoapLoginResponseHeaders(this.client.lastResponseHeaders)) {
//       throw new Error("Failed to login");
//     }
//     this.addAuthorisationHttpHeader(
//       this.client.lastResponseHeaders["set-cookie"]
//     );
//   }
//   addAuthorisationHttpHeader(sessnum: string[]) {
//     this.client.addHttpHeader("set-cookie", sessnum);
//   }
//   async getServiceCategories(fltParams: {}) {
//     const response = await this.client.getServiceCategoriesAsync(fltParams);
//     return response;
//   }
//   async getStat(dtfrom: string, dtto: string, ani: string) {
//     // repnum 7 означает статистику по сессиям RADIUS-агента
//     const repnum = 7;
//     // номер радиус сервера
//     const agentid = 2;
//     // сортировка по учетным записям
//     const repdetail = 0;

//     const response = await this.client.getStatAsync({
//       flt: {
//         repnum,
//         agentid,
//         dtfrom,
//         dtto,
//         ani,
//         repdetail,
//       },
//     });
//     return response;
//   }
//   async getDiscounts(fltParams: {}) {
//     const response = await this.client.getDiscountsAsync(fltParams);
//     return response;
//   }

//   private async fetchData<T>(
//     apiMethod: (params: {}) => Promise<any>,
//     typeGuard: (response: any) => boolean,
//     fltParams: {}
//   ): Promise<T | null> {
//     try {
//       const response = await apiMethod(fltParams);
//       return typeGuard(response) ? response[0].ret : null;
//     } catch (error) {
//       console.log("Fetch data failed");
//       return null;
//     }
//   }

//   async getTarif(fltParams: {}): Promise<GetTarifResponse[] | null> {
//     return this.fetchData<GetTarifResponse[]>(
//       this.client.getTarifAsync,
//       isGetTarifAPIResponse,
//       fltParams
//     );
//   }
//   async getTarifs(fltParams: {}): Promise<TarifItem[] | null> {
//     return this.fetchData<TarifItem[]>(
//       this.client.getTarifsAsync,
//       isGetTarifsAPIResponse,
//       fltParams
//     );
//   }
//   async getVgroups(fltParams: {}): Promise<GetVgroupsItem[] | null> {
//     return this.fetchData<GetVgroupsItem[]>(
//       this.client.getVgroupsAsync,
//       isGetVgroupsAPIResponse,
//       fltParams
//     );
//   }
//   async getAccounts(fltParams: {}) {
//     return this.fetchData<GetAccountsItem[]>(
//       this.client.getAccountsAsync,
//       isGetAccountsAPIResponse,
//       fltParams
//     );
//     // const response = await this.client.getAccountsAsync(fltParams);
//     // return response;
//   }
//   async getAccount(fltParams: {}) {
//     return this.fetchData<GetAccountItem[]>(
//       this.client.getAccountAsync,
//       isGetAccountAPIResponse,
//       fltParams
//     );
//     // const response = await this.client.getAccountAsync(fltParams);
//     // return response;
//   }
//   async getPayments(fltParams: {}) {
//     const response = await this.client.getPaymentsAsync(fltParams);
//     return response;
//   }
//   async payment(params: PaymentArguments) {
//     const { agrmid, amount, modperson = "", transactionId = "" } = params;

//     if (isNaN(Number(amount))) {
//       throw new Error("Wrong amount type!!!");
//     }
//     const receipt = transactionId;
//     const response = await this.client.PaymentAsync({
//       val: {
//         agrmid,
//         amount,
//         receipt,
//         modperson,
//       },
//     });
//     return response;
//   }
//   async insupdTarifsRasp(vgid: number) {

//     const response = await this.client.insupdTarifsRaspAsync({
//       val: {
//         vgid,
//         taridnew: 3,
//         taridold: 2,
//         changetime: '2025-01-01 00:00:00',
//       },
//     });
//     return response;
//   }
//   async cancelPayment(payload: GetPaymentsProfile) {
//     const STATUS_CANCELLED = "2";
//     const ZERO_AMOUNT = "0.0";
//     const { recordid, agrmid, currid, classid, modperson, receipt } =
//       payload.pay;
//     const response = await this.client.PaymentAsync({
//       val: {
//         recordid,
//         currid,
//         classid,
//         modperson,
//         agrmid,
//         receipt,
//         status: STATUS_CANCELLED,
//         amount: ZERO_AMOUNT,
//       },
//     });
//     return response;
//   }
//   async clientLogin(fltParams: {}) {
//     const response = await this.client.ClientLoginAsync(fltParams);
//     return response;
//   }
//   async loginAsync(fltParams: {}) {
//     const response = await this.client.LoginAsync(fltParams);
//     return response;
//   }
//   async logoutAsync() {
//     const response = await this.client.LogoutAsync({});
//     return response;
//   }
//   async findAccountByMac(dtfrom: string, dtto: string, ani: string): Promise<{ userName: string; address: string } | null> {
//     const rawStatData = await this.getStat(dtfrom, dtto, ani);
//     const formattedStatResponse = formatGetStatResponse(rawStatData);

//     if (formattedStatResponse === null) {
//       return null;
//     }
//     const vgroups = await this.getVgroups({
//       flt: {
//         vgid: formattedStatResponse[0]["vg_id"]
//       }
//     })
//     if (vgroups !== null) {
//       return getVgroupPersonalInfo(vgroups);
//     }
//     return null;
//   }
// }
