import { Client, createClientAsync } from "soap";
import path from "path";
import {CancelPaymentParams, LoginParams, SoapFilter, SoapIdName, SoapManagerFull, SoapPayment, SoapPaymentFull, TariffFilter} from "./types";

export default class NodeSoap {
    private readonly client: Client;
    private static readonly DEFAULT_WSDL = "api3.wsdl";
    private static readonly SOAP_DIR = "soap";
    private constructor(client: Client) {
        this.client = client;
    }
    static async init(): Promise<NodeSoap> {
        const endpoint = process.env.BILLING_URL;
        if (!endpoint) {
            throw new Error('SOAP endpoint URL is not configured');
        }
        try {
            const wsdlPath = path.join(path.dirname(__dirname), this.SOAP_DIR, this.DEFAULT_WSDL);
            const client: Client = await createClientAsync(wsdlPath, { endpoint });
            return new NodeSoap(client);
        } catch (error) {
            const errorMessage = error instanceof Error
                ? error.message
                : 'Unknown error';
            throw new Error(`SOAP client initialization failed: ${errorMessage}`);
        }
    }
    private isValidSoapResponse(response: any): boolean {
        const checks = [
            Array.isArray(response),
            response.length > 0,
            typeof response[0] === "object",
            'ret' in response[0],
        ]
        return checks.every(check => check);
    }
    private async baseRequest<T>(
        apiMethod: (params?: {}) => Promise<any>,
        fltParams?: {}
    ): Promise<T> {
        const response = await apiMethod(fltParams);
        if (!this.isValidSoapResponse(response)) {
            throw new Error("Soap response is not valid");
        }
        return response[0].ret;
    }

    async loginAsync(params: LoginParams): Promise<SoapManagerFull[]> {
        const result = await this.baseRequest<SoapManagerFull[]>(this.client.LoginAsync, params);
        const authCookie = this.client.lastResponseHeaders?.["set-cookie"];
        if (authCookie) {
            this.client.addHttpHeader("set-cookie", authCookie);
        }
        return result;
    }
    async logoutAsync(): Promise<void> {
        await this.baseRequest<void>(this.client.LogoutAsync, {});
    }
    async getPayments(params: SoapFilter): Promise<SoapPaymentFull[]> {
        const result = await this.baseRequest<SoapPaymentFull[]>(this.client.getPaymentsAsync, { flt: params });
        return result;
    }
    async getExactPaymentByReceipt(receipt: string): Promise<SoapPaymentFull | null> {
        const result = await this.baseRequest<SoapPaymentFull[]>(this.client.getPaymentsAsync, { flt: { receipt } });
        const exactPayment = result.find(el => el.pay.receipt === receipt);
        return exactPayment || null;
    }
    async getTarifs(params: TariffFilter = {}): Promise<SoapIdName[]> {
        const result = await this.baseRequest<SoapIdName[]>(this.client.getTarifsAsync, params);
        return result;
    }
    async submitPayment(params: SoapPayment): Promise<SoapPaymentFull['pay']['recordid']> {
        const result = await this.baseRequest<SoapPaymentFull['pay']['recordid']>(this.client.PaymentAsync, { val: params });
        return result;
    }
    async cancelPayment(params: CancelPaymentParams): Promise<SoapPaymentFull['pay']['recordid']> {
        const ZERO_AMOUNT = 0.0;
        const STATUS_CANCELLED = 2;
        const result = await this.baseRequest<SoapPaymentFull['pay']['recordid']>(this.client.PaymentAsync, { val: { ...params, status: STATUS_CANCELLED, amount: ZERO_AMOUNT } })
        return result;
    }
}


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
// }
