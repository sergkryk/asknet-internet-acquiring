import { Request, Response, NextFunction } from 'express';
import NodeSoap from '../services/soap/soap';
import { SoapAccount, SoapAddressBrief, SoapAgreement, SoapClientVgroupFull } from '../services/soap/types';
import { tarifsManager } from '../utils/tarifs';
import { HttpError } from '../utils/errorHadler';
// Frontend response types
interface FrontendVgroupsResponse {
	vgroup: {
		vgid?: number;
		tarifid: number;
		curshape?: number;
		blocked?: number;
		servicerent?: number;
		agentdescr?: string;
		tarifdescr?: string;
		login?: string;
		currentmodifier?: {
			type?: string; // Corresponds to xsd:string, optional
			value?: number; // Corresponds to xsd:double, optional
		};
	};
	addresses: SoapAddressBrief[] | undefined;
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
	operid?: number;
}
interface FrontedResponse {
	account: FrontendAccountResponse;
	agreements: FrontedAgreementResponse;
	vgroups: FrontendVgroupsResponse[];
}
// Filter to send only necessary object keys
const filterAgreementFields = (candidate: SoapAgreement): FrontedAgreementResponse => {
	const { agrmid, vgroups, balance, credit, number, date, operid } = candidate;
	return { agrmid, vgroups, balance, credit, number, date, operid };
};
// Filter to send only necessary object keys
function filterVgroupsFields(candidate: SoapClientVgroupFull[]): FrontendVgroupsResponse[] {
	const result: FrontendVgroupsResponse[] = [];
	for (let i = 0; i < candidate.length; i++) {
		const { vgroup, addresses } = candidate[i];
		const { vgid, curshape, blocked, servicerent, agentdescr, tarifid, tarifdescr, login, currentmodifier } = vgroup;
		result.push({
			vgroup: {
				vgid,
				curshape,
				blocked,
				servicerent,
				agentdescr,
				tarifid,
				tarifdescr,
				login,
				currentmodifier,
			},
			addresses,
		});
	}
	return result;
}
// Filter to send only necessary object keys
function filterAccountFields(candidate: SoapAccount): FrontendAccountResponse {
	const {
		uid,
		name,
		phone,
		mobile,
		email,
		login,
		pass,
		passissuedate,
		passissuedep,
		passissueplace,
		passno,
		passsernum,
	} = candidate;
	return {
		uid,
		name,
		phone: phone ? phone : mobile,
		email,
		login,
		pass,
		isPassport: passissuedate && passissuedep && passissueplace && passno && passsernum ? true : false,
	};
}
// Validate soap response
function validateAccountResponse(candidate: any): boolean {
	return Array.isArray(candidate) && candidate.length > 0 && candidate.every((item: any) => 'account' in item);
}
// Validate soap response
function validateVgroupsResponse(candidate: any): boolean {
	return Array.isArray(candidate) && candidate.length >= 0;
}
// adds services to vgroups - to give frontend information about dayly or monthly rent
async function addServicesToVgroups(vgroupList: FrontendVgroupsResponse[]): Promise<void> {
	for (let i = 0; i < vgroupList.length; i++) {
		const { tarifid } = vgroupList[i].vgroup;
		const services = await tarifsManager.getServiceByTarid(tarifid);
		services.forEach((service) => {
			const { rentperiod } = service;
			Object.assign(vgroupList[i], { service: { rentperiod } });
		});
	}
}
// Client data fetch and validation
async function getClientData(
	params: string | { login: string; pass: string }
): Promise<[user: FrontedResponse, soap: NodeSoap]> {
	try {
		const soap = await NodeSoap.init();
		if (typeof params === 'string') {
			soap.setHttpCookie(params);
		} else {
			await soap.clientLogin(params);
		}
		const account = await soap.getClientAccount();
		if (!validateAccountResponse(account)) {
			throw new HttpError('Invalid account response', 400);
		}
		const vgroups = await soap.getClientVgroups();
		if (!validateVgroupsResponse(vgroups)) {
			throw new HttpError('Invalid vgroups response', 400);
		}
		const frontendAccount = filterAccountFields(account[0].account);
		const frontendAgreements = filterAgreementFields(account[0].agreements[0]);
		const frontendVgroups = filterVgroupsFields(vgroups);
		await addServicesToVgroups(frontendVgroups);
		return [
			{
				account: frontendAccount,
				agreements: frontendAgreements,
				vgroups: frontendVgroups,
			},
			soap,
		];
	} catch (error) {
		throw new HttpError('Login or pass not recognized', 401);
	}
}
// Sets authentication cookies received from soap into browser
function setAuthenticatedCookieToClient(res: Response, cookie: string): void {
	const [sessnum, domain, path, version, maxAge] = cookie.split(';');
	res.setHeader('Set-Cookie', `${sessnum};${path};${version};${maxAge}`);
}
// Send data to client portal
function sendClientData(res: Response, account: FrontedResponse): void {
	res.status(200).json(account);
}
// Validates credentials
function validateCredentials(req: Request, res: Response): Response | void {
	const { login, password } = req.body;
	if (!login || !password) throw new HttpError('Invalid request body format', 400);
	if (login.length < 4) throw new HttpError('Login must be at least 4 characters long', 400);
	if (password.length < 6) throw new HttpError('Password must be at least 6 characters long', 400);
	if (!/^[a-zA-Z0-9]+$/.test(password)) throw new HttpError('Password can only contain letters and numbers', 400);
}
// check if cookie present
function validateRequestCookie(req: Request, res: Response): Response | string {
	if (!req.headers.cookie) {
		throw new HttpError('Authorise before requesting data', 401);
	} else {
		return req.headers.cookie;
	}
}
// GET controller
export const clientGetController = async function (req: Request, res: Response, next: NextFunction) {
	try {
		const sessnum = validateRequestCookie(req, res);
		const [account] = await getClientData(sessnum as string);
		sendClientData(res, account);
	} catch (error) {
		next(error);
	}
};
// POST controller
export const clientPostController = async function (req: Request, res: Response, next: NextFunction) {
	try {
		validateCredentials(req, res);
		const [account, soap] = await getClientData({
			login: req.body.login,
			pass: req.body.password,
		});
		const cookie = soap.getHttpHeaders()?.['set-cookie'];
		setAuthenticatedCookieToClient(res, cookie[0]);
		sendClientData(res, account);
	} catch (error) {
		next(error);
	}
};
