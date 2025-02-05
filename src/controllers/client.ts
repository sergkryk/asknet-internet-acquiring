import { Request, Response } from "express";
import NodeSoap from "../soap/soap";
import { SoapAccount, SoapAddressBrief, SoapAgreement, SoapClientVgroupFull } from "../soap/types";

interface FrontendVgroupsResponse {
  vgroup: {
    vgid?: number;
    curshape?: number;
    blocked?: number;
    servicerent?: number;
    agentdescr?: string;
    tarifdescr?: string;
    login?: string;
    currentmodifier?: {
      type?: string; // Corresponds to xsd:string, optional
      value?: number; // Corresponds to xsd:double, optional
    }
  }
  addresses: SoapAddressBrief[] | undefined
}
interface FrontendAccountResponse {
  uid: number;
  name?: string;
  phone?: string;
  email?: string;
  login: string;
  pass?: string;
  isPassport?: boolean;
}
interface FrontedAgreementResponse {
  agrmid: number;
  vgroups?: number;
  balance?: number;
  credit?: number;
  number?: string;
  date?: string;
}
interface FrontedResponse {
  account: FrontendAccountResponse;
  agreements: FrontedAgreementResponse;
  vgroups: FrontendVgroupsResponse[];
}
// оставляет только нужные поля для отправки на портал абонента
const filterAgreementFields = (candidate: SoapAgreement): FrontedAgreementResponse => {
  const { agrmid, vgroups, balance, credit, number, date } = candidate;
  return { agrmid, vgroups, balance, credit, number, date };
}
// оставляет только нужные поля для отправки на портал абонента
function filterVgroupsFields(candidate: SoapClientVgroupFull[]): FrontendVgroupsResponse[] {
  const result: FrontendVgroupsResponse[] = []
  for (let i = 0; i < candidate.length; i++) {
    const { vgroup, addresses } = candidate[i]
    const { vgid, curshape, blocked, servicerent, agentdescr, tarifdescr, login, currentmodifier } = vgroup
    result.push({
      vgroup: {
        vgid,
        curshape,
        blocked,
        servicerent,
        agentdescr,
        tarifdescr,
        login,
        currentmodifier
      },
      addresses
    })
  }
  return result;
}
// оставляет только нужные поля для отправки на портал абонента
function filterAccountFields(candidate: SoapAccount): FrontendAccountResponse {
  const { uid, name, phone, email, login, pass, passissuedate, passissuedep, passissueplace, passno, passsernum } = candidate;
  return {
    uid,
    name,
    phone,
    email,
    login,
    pass,
    isPassport: passissuedate && passissuedep && passissueplace && passno && passsernum ? true : false
  }
}
// проверяет корректность ответа от сервиса
function validateAccountResponse(candidate: any): boolean {
  const checks = [
    Array.isArray(candidate),
    candidate.length > 0,
    candidate.every((item: any) => 'account' in item),
  ]
  return checks.every(el => el);
}
// проверяет корректность ответа от сервиса
function validateVgroupsResponse(candidate: any): boolean {
  const checks = [
    Array.isArray(candidate),
    candidate.length >= 0,
  ]
  return checks.every(el => el);
}
// получает данные абонента из сервиса
async function getClientData(params: string | { login: string, pass: string }): Promise<[user: FrontedResponse, soap: NodeSoap ]> {
  const soap = await NodeSoap.init();
  if (typeof params === 'string') {
    soap.setHttpCookie(params);
  } else {
    await soap.clientLogin(params);
  }
  const account = await soap.getClientAccount();
  if (!validateAccountResponse(account)) {
    throw new Error("Invalid account response");
  }
  const vgroups = await soap.getClientVgroups();
  if (!validateVgroupsResponse(vgroups)) {
    throw new Error("Invalid vgroups response");
  }
  const frontendAccount = filterAccountFields(account[0].account);
  const frontendAgreements = filterAgreementFields(account[0].agreements[0])
  const frontendVgroups = filterVgroupsFields(vgroups)
  return [{ account: frontendAccount, agreements: frontendAgreements, vgroups: frontendVgroups }, soap ];
}
// устанавливает куку в браузер абонента для авторизации на портале абонента
function setAuthenticatedCookieToClient(res: Response, cookie: string): void {
  const [sessnum, domain, path, version, maxAge] = cookie.split(';');
  res.setHeader('Set-Cookie', `${sessnum};${path};${version};${maxAge}`);
}
// отправляет данные абонента на портал
function sendClientData(res: Response, account: FrontedResponse): void {
  res.status(200).json(account);
}
// проверяет корректность введенных данных
function validateCredentials(req: Request, res: Response): Response | void {
  const { login, password } = req.body;
  if (!login || !password) {
    return res.status(400).json({ error: "Invalid request body format" });
  }
  if (login.length < 4) {
    return res.status(400).json({ error: "Login must be at least 4 characters long" });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters long" });
  }
  if (!/^[a-zA-Z0-9]+$/.test(password)) {
    return res.status(400).json({ error: "Password can only contain letters and numbers" });
  }
}
// проверяет наличие куки в запросе
function validateRequestCookie(req: Request, res: Response): Response | string {
  if (!req.headers.cookie) {
    return res.status(401).json({ error: "Unauthorized" });
  } else {
    return req.headers.cookie;
  }
}
// обрабатывает ошибки
function handleError(res: Response, error: any): Response {
  if (error instanceof Error) {
    return res.status(500).json({ error: error.message });
  } else {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
// GET controller
export const clientGetController = async function (req: Request, res: Response) {
  try {
    const sessnum = validateRequestCookie(req, res);
    const [ account ] = await getClientData(sessnum as string);
    sendClientData(res, account);
  } catch (error) {
    handleError(res, error);
  }
}
// POST controller
export const clientPostController = async function (req: Request, res: Response) {
  try {
    validateCredentials(req, res);
    const [ account, soap ] = await getClientData({ login: req.body.login, pass: req.body.password });
    const cookie = soap.getHttpHeaders()?.['set-cookie'];
    setAuthenticatedCookieToClient(res, cookie[0]);
    sendClientData(res, account);
  } catch (error) {
    handleError(res, error);
  }
};


