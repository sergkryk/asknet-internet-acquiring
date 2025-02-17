import { Client, createClientAsync, IHeaders } from "soap";
import path from "path";
import {CancelPaymentParams, ClientLoginParams, LoginParams, SoapAccountFull, SoapClientLogin, SoapClientVgroupFull, SoapFilter, SoapIdName, SoapManagerFull, SoapPayment, SoapPaymentFull, SoapTarifFull, TariffFilter} from "./types";
import { HttpError } from "../../utils/errorHadler";

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
            throw new HttpError('SOAP endpoint URL is not configured', 500);
        }
        try {
            const wsdlPath = path.join(path.dirname(__dirname), this.SOAP_DIR, this.DEFAULT_WSDL);
            const client: Client = await createClientAsync(wsdlPath, { endpoint });
            return new NodeSoap(client);
        } catch (error) {
            const errorMessage = error instanceof Error
                ? error.message
                : 'Unknown error';
            throw new HttpError(`SOAP client initialization failed: ${errorMessage}`, 400);
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
            throw new HttpError("Soap response is not valid", 500);
        }
        return response[0].ret;
    }

    async login(params: LoginParams): Promise<SoapManagerFull[]> {
        const result = await this.baseRequest<SoapManagerFull[]>(this.client.LoginAsync, params);
        // add auth cookie to client instance
        const authCookie = this.client.lastResponseHeaders?.["set-cookie"];
        if (authCookie) {
            this.client.addHttpHeader("set-cookie", authCookie);
        }
        return result;
    }
    async logout(): Promise<void> {
        await this.baseRequest<void>(this.client.LogoutAsync, {});
    }
    async getPayments(params: SoapFilter): Promise<SoapPaymentFull[]> {
        const result = await this.baseRequest<SoapPaymentFull[]>(this.client.getPaymentsAsync, { flt: params });
        return result;
    }
    async getServiceCategories(params: SoapFilter  = {}): Promise<any> {
        const result = await this.baseRequest<SoapPaymentFull[]>(this.client.getServiceCategoriesAsync, { flt: params });
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
    // methods for customer portal
    async clientLogin(params: ClientLoginParams): Promise<SoapClientLogin> {
        const result = await this.baseRequest<SoapClientLogin>(this.client.ClientLoginAsync, params);
        const authCookie = this.client.lastResponseHeaders?.["set-cookie"];
        if (authCookie) {
            this.client.addHttpHeader("set-cookie", authCookie);
        }
        return result;
    }
    async getClientAccount(): Promise<SoapAccountFull[]> {
        const result = await this.baseRequest<SoapAccountFull[]>(this.client.getClientAccountAsync, {});
        return result;
    }
    async getClientVgroups(): Promise<SoapClientVgroupFull[]> {
        const result = await this.baseRequest<SoapClientVgroupFull[]>(this.client.getClientVgroupsAsync, {});
        return result;
    }
    getHttpHeaders(): IHeaders {
        const cookie = this.client.getHttpHeaders();
        return cookie;
    }
    setHttpCookie(sessnum: string): void {
        const cookie = `${sessnum};Domain=10.45.0.50;Path=/;Version=1;Max-Age=7200;`;
        this.client.addHttpHeader("set-cookie", cookie);
    }
}

