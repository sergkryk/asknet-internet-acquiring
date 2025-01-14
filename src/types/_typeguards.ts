import {
  PayFormBody,
  CitypayQuery,
  PaydayQuery,
  ManagerProfile,
  NodeSoapLoginResponse,
  VgroupProfile,
  NodeSoapVgroupResponse,
  AccountProfile,
  NodeSoapAccountResponse,
  NodeSoapPaymentResponse,
  NodeSoapGetPaymentsResponse,
  GetPaymentsProfile,
  GetPaymentsPayRecord,
  NodeSoapGetPaymentsPaydayResponse,
  NodeSoapClientLoginResponse,
  AccountProfileFull,
  UserGroupFull,
  AddressFull,
  AgreementFull,
  NodeSoapAccountFullResponse,
  ServiceProfile,
  NodeSoapGetServiceResponse,
  NodeSoapLoginResponseHeaders,
  CookiesToken,
  Token,
  CitypayCheck,
  PrintCheckItem,
  PrintCheckCommand,
  PrintCheckResponse,
  GetStatRetItem,
  GetStatRetResponse,
  GetVgroupsUserInfoAddress,
  GetVgroupsUserInfo,
  GetStatAccount,
  SoapResponse,
} from "./types";

export const isPayFormBody = function (
  payload: unknown
): payload is PayFormBody {
  if (typeof payload === "object" && payload !== null) {
    return (
      "agrmid" in payload &&
      "sum" in payload &&
      "phone" in payload &&
      "token" in payload
    );
  }
  return false;
};

export const isCitypayQuery = function (
  payload: unknown
): payload is CitypayQuery {
  if (typeof payload === "object" && payload !== null) {
    return (
      "QueryType" in payload &&
      "TransactionId" in payload &&
      "Account" in payload &&
      "Amount" in payload
    );
  }
  return false;
};

export const isCitypayCheck = function (
  payload: unknown
): payload is CitypayCheck {
  if (typeof payload === "object" && payload !== null) {
    return (
      "QueryType" in payload &&
      "TransactionId" in payload &&
      "Account" in payload
    );
  }
  return false;
};

export const isPaydayQuery = function (
  payload: unknown
): payload is PaydayQuery {
  if (typeof payload === "object" && payload !== null) {
    return "CheckDateBegin" in payload && "CheckDateEnd" in payload;
  }
  return false;
};

export const isManagerProfile = function (obj: any): obj is ManagerProfile {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.notifyclient === "number" &&
    typeof obj.personid === "number" &&
    typeof obj.isadmin === "number" &&
    typeof obj.changepass === "number" &&
    typeof obj.archive === "number" &&
    typeof obj.accounts === "number" &&
    typeof obj.agents === "number" &&
    typeof obj.agrmgroups === "number" &&
    typeof obj.actions === "number" &&
    typeof obj.broadcast === "number" &&
    typeof obj.calendar === "number" &&
    typeof obj.cards === "number" &&
    typeof obj.cardsets === "number" &&
    typeof obj.cashonhand === "number" &&
    typeof obj.catalog === "number" &&
    typeof obj.currency === "number" &&
    typeof obj.discount === "number" &&
    typeof obj.helpdesk === "number" &&
    typeof obj.ipstat === "number" &&
    typeof obj.logs === "number" &&
    typeof obj.managers === "number" &&
    typeof obj.operators === "number" &&
    typeof obj.optionscommon === "number" &&
    typeof obj.orders === "number" &&
    typeof obj.paydocs === "number" &&
    typeof obj.payments === "number" &&
    typeof obj.radattr === "number" &&
    typeof obj.recount === "number" &&
    typeof obj.reports === "number" &&
    typeof obj.services === "number" &&
    typeof obj.tarifs === "number" &&
    typeof obj.timestat === "number" &&
    typeof obj.unions === "number" &&
    typeof obj.usboxstat === "number" &&
    typeof obj.users === "number" &&
    typeof obj.userspreorders === "number" &&
    typeof obj.usergroups === "number" &&
    typeof obj.hdsettings === "number" &&
    typeof obj.invdevices === "number" &&
    typeof obj.checkpass === "number" &&
    typeof obj.optionsdocuments === "number" &&
    typeof obj.optionshosts === "number" &&
    typeof obj.optionsfunctions === "number" &&
    typeof obj.applications === "number" &&
    typeof obj.useadvance === "number" &&
    typeof obj.authlogs === "number" &&
    typeof obj.bso === "number" &&
    typeof obj.postmans === "number" &&
    typeof obj.registry === "number" &&
    typeof obj.packages === "number" &&
    typeof obj.clientequipment === "number" &&
    typeof obj.activesessions === "number" &&
    typeof obj.gifts === "number" &&
    typeof obj.minutepackets === "number" &&
    typeof obj.usersextfields === "number" &&
    typeof obj.istemplate === "string" &&
    typeof obj.parenttemplate === "number" &&
    typeof obj.saledictionary === "number" &&
    typeof obj.kladr === "number" &&
    typeof obj.payclassid === "number" &&
    typeof obj.login === "string" &&
    typeof obj.pass === "string" &&
    typeof obj.fio === "string" &&
    typeof obj.email === "string" &&
    typeof obj.descr === "string" &&
    typeof obj.office === "string" &&
    typeof obj.externalid === "string" &&
    typeof obj.cashregisterfolder === "string"
  );
};

export const isVgroupProfile = function (obj: any): obj is VgroupProfile {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.templ === "number" &&
    typeof obj.unloadtosorm === "number" &&
    typeof obj.vgid === "number" &&
    typeof obj.parentvgid === "number" &&
    typeof obj.id === "number" &&
    typeof obj.tarid === "number" &&
    typeof obj.agrmid === "number" &&
    typeof obj.blkreq === "number" &&
    typeof obj.blocked === "number" &&
    typeof obj.uid === "number" &&
    typeof obj.agenttype === "number" &&
    typeof obj.usercategory === "number" &&
    typeof obj.cuid === "number" &&
    typeof obj.dirty === "number" &&
    typeof obj.balance === "number" &&
    typeof obj.ppdebt === "number" &&
    typeof obj.rent === "number" &&
    typeof obj.monthlyrent === "number" &&
    typeof obj.totalmonthlyrent === "number" &&
    typeof obj.dlimit === "number" &&
    typeof obj.authmethod === "string" &&
    typeof obj.dclear === "string" &&
    typeof obj.login === "string" &&
    typeof obj.descr === "string" &&
    typeof obj.agrmnum === "string" &&
    typeof obj.code === "string" &&
    typeof obj.username === "string" &&
    typeof obj.creationdate === "string" &&
    typeof obj.accondate === "string" &&
    typeof obj.accoffdate === "string" &&
    typeof obj.blockdate === "string" &&
    typeof obj.agentdescr === "string" &&
    typeof obj.tarifdescr === "string" &&
    typeof obj.symbol === "string" &&
    typeof obj.parentvglogin === "string" &&
    typeof obj.changedtariffon === "string" &&
    typeof obj.pass === "string" &&
    Array.isArray(obj.address) &&
    typeof obj.renewalstate === "number"
  );
};

export const isAccountProfile = function (obj: any): obj is AccountProfile {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.soleproprietor === "boolean" &&
    typeof obj.uid === "number" &&
    typeof obj.vgcnt === "number" &&
    typeof obj.type === "number" &&
    typeof obj.category === "number" &&
    typeof obj.def === "number" &&
    typeof obj.templ === "number" &&
    typeof obj.login === "string" &&
    typeof obj.name === "string" &&
    typeof obj.descr === "string" &&
    typeof obj.email === "string" &&
    typeof obj.phone === "string" &&
    typeof obj.mobile === "string" &&
    typeof obj.managerid === "number" &&
    typeof obj.managername === "string" &&
    typeof obj.managerlogin === "string"
  );
};

export const isGetPaymentsPayRecord = function (
  obj: any
): obj is GetPaymentsPayRecord {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.recordid === "number" &&
    typeof obj.parentrecordid === "number" &&
    typeof obj.agrmid === "number" &&
    typeof obj.modperson === "number" &&
    typeof obj.currid === "number" &&
    typeof obj.orderid === "number" &&
    typeof obj.status === "number" &&
    typeof obj.classid === "number" &&
    typeof obj.amount === "number" &&
    typeof obj.fromagrmid === "number" &&
    typeof obj.revno === "number" &&
    typeof obj.revisions === "number" &&
    typeof obj.cashcode === "number" &&
    typeof obj.classname === "string" &&
    typeof obj.paydate === "string" &&
    typeof obj.localdate === "string" &&
    typeof obj.canceldate === "string" &&
    typeof obj.perioddate === "string" &&
    typeof obj.receipt === "string" &&
    typeof obj.comment === "string" &&
    typeof obj.uuid === "string" &&
    typeof obj.fromagrmnumber === "string" &&
    typeof obj.paymentordernumber === "string"
  );
};

export const isGetPaymentsProfile = function (
  obj: any
): obj is GetPaymentsProfile {
  return (
    typeof obj === "object" &&
    obj !== null &&
    isGetPaymentsPayRecord(obj.pay) &&
    typeof obj.bsodoc === "number" &&
    typeof obj.timestamp === "number" &&
    typeof obj.localtimestamp === "number" &&
    typeof obj.amountcurr === "number" &&
    typeof obj.ordernum === "string" &&
    typeof obj.uid === "number" &&
    typeof obj.operid === "number" &&
    typeof obj.cardnumber === "number" &&
    typeof obj.currsymb === "string" &&
    typeof obj.uname === "string" &&
    typeof obj.agrm === "string" &&
    typeof obj.mgr === "string" &&
    typeof obj.mgrdescr === "string" &&
    typeof obj.mgrlogin === "string" &&
    typeof obj.opername === "string" &&
    typeof obj.login === "string" &&
    typeof obj.iseps === "boolean"
  );
};

export const isNodeSoapLoginResponse = function (
  obj: any
): obj is NodeSoapLoginResponse {
  return (
    Array.isArray(obj) &&
    obj.length === 5 &&
    typeof obj[0] === "object" &&
    obj[0] !== null &&
    Array.isArray(obj[0].ret) &&
    obj[0].ret.length === 1 &&
    typeof obj[0].ret[0] === "object" &&
    isManagerProfile(obj[0].ret[0].manager) &&
    typeof obj[1] === "string" &&
    (typeof obj[2] === "undefined" || typeof obj[2] === "string") &&
    typeof obj[3] === "string" &&
    typeof obj[4] === "undefined"
  );
};

export const isNodeSoapVgroupResponse = function (
  obj: any
): obj is NodeSoapVgroupResponse {
  return (
    Array.isArray(obj) &&
    obj.length === 5 &&
    typeof obj[0] === "object" &&
    obj[0] !== null &&
    Array.isArray(obj[0].ret) &&
    obj[0].ret.length > 0 &&
    isVgroupProfile(obj[0].ret[0]) &&
    typeof obj[1] === "string" &&
    (typeof obj[2] === "undefined" || typeof obj[2] === "string") &&
    typeof obj[3] === "string" &&
    typeof obj[4] === "undefined"
  );
};

export const isNodeSoapAccountResponse = function (
  obj: any
): obj is NodeSoapAccountResponse {
  return (
    Array.isArray(obj) &&
    obj.length === 5 &&
    typeof obj[0] === "object" &&
    obj[0] !== null &&
    Array.isArray(obj[0].ret) &&
    obj[0].ret.length === 1 &&
    typeof obj[0].ret[0] === "object" &&
    typeof obj[0].ret[0].application === "number" &&
    isAccountProfile(obj[0].ret[0].account) &&
    typeof obj[1] === "string" &&
    (typeof obj[2] === "undefined" || typeof obj[2] === "string") &&
    typeof obj[3] === "string" &&
    typeof obj[4] === "undefined"
  );
};

export const isNodeSoapPaymentResponse = function (
  obj: any
): obj is NodeSoapPaymentResponse {
  return (
    Array.isArray(obj) &&
    obj.length === 5 &&
    typeof obj[0] === "object" &&
    "ret" in obj[0] &&
    typeof obj[0].ret === "number"
  );
};

export const isNodeSoapGetPaymentsResponse = function (
  obj: any
): obj is NodeSoapGetPaymentsResponse {
  return (
    Array.isArray(obj) &&
    obj.length === 5 &&
    typeof obj[0] === "object" &&
    obj[0] !== null &&
    Array.isArray(obj[0].ret) &&
    obj[0].ret.length > 0 &&
    isGetPaymentsProfile(obj[0].ret[0]) &&
    typeof obj[1] === "string" &&
    (typeof obj[2] === "undefined" || typeof obj[2] === "string") &&
    typeof obj[3] === "string" &&
    (typeof obj[4] === "undefined" || typeof obj[4] === "string")
  );
};

export const isNodeSoapGetPaymentsPaydayResponse = function (
  obj: any
): obj is NodeSoapGetPaymentsPaydayResponse {
  return (
    Array.isArray(obj) &&
    obj.length === 5 &&
    typeof obj[0] === "object" &&
    obj[0] !== null &&
    Array.isArray(obj[0].ret) &&
    obj[0].ret.every(isGetPaymentsProfile) &&
    typeof obj[1] === "string" &&
    (typeof obj[2] === "undefined" || typeof obj[2] === "string") &&
    typeof obj[3] === "string" &&
    (typeof obj[4] === "undefined" || typeof obj[4] === "string")
  );
};

export const isClientLoginResponseRet = function (
  obj: any
): obj is { uid: number; timelastlogin: string } {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.uid === "number" &&
    typeof obj.timelastlogin === "string"
  );
};

export const isNodeSoapClientLoginResponse = function (
  obj: any
): obj is NodeSoapClientLoginResponse {
  return (
    Array.isArray(obj) &&
    obj.length === 5 &&
    typeof obj[0] === "object" &&
    obj[0] !== null &&
    Array.isArray(obj[0].ret) &&
    obj[0].ret.length === 1 &&
    isClientLoginResponseRet(obj[0].ret[0]) &&
    typeof obj[1] === "string" &&
    (typeof obj[2] === "undefined" || typeof obj[2] === "string") &&
    typeof obj[3] === "string" &&
    (typeof obj[4] === "undefined" || typeof obj[4] === "string")
  );
};

function isAccountProfileFull(obj: any): obj is AccountProfileFull {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.uid === "number" &&
    typeof obj.doctype === "number" &&
    typeof obj.ipaccess === "number" &&
    typeof obj.billdelivery === "number" &&
    typeof obj.category === "number" &&
    typeof obj.type === "number" &&
    typeof obj.oksm === "number" &&
    typeof obj.templ === "number" &&
    typeof obj.wrongactive === "number" &&
    typeof obj.archive === "number" &&
    typeof obj.ownership === "number" &&
    typeof obj.mobileisconfirmed === "boolean" &&
    typeof obj.emailisconfirmed === "boolean" &&
    typeof obj.offerisaccepted === "boolean" &&
    typeof obj.soleproprietor === "boolean" &&
    typeof obj.login === "string" &&
    typeof obj.pass === "string" &&
    typeof obj.descr === "string" &&
    typeof obj.name === "string" &&
    typeof obj.phone === "string" &&
    typeof obj.fax === "string" &&
    typeof obj.email === "string" &&
    typeof obj.mobile === "string" &&
    typeof obj.bankname === "string" &&
    typeof obj.branchbankname === "string" &&
    typeof obj.treasuryname === "string" &&
    typeof obj.treasuryaccount === "string" &&
    typeof obj.bik === "string" &&
    typeof obj.settl === "string" &&
    typeof obj.corr === "string" &&
    typeof obj.kpp === "string" &&
    typeof obj.inn === "string" &&
    typeof obj.ogrn === "string" &&
    typeof obj.okpo === "string" &&
    typeof obj.okved === "string" &&
    typeof obj.gendiru === "string" &&
    typeof obj.glbuhgu === "string" &&
    typeof obj.kontperson === "string" &&
    typeof obj.actonwhat === "string" &&
    typeof obj.passsernum === "string" &&
    typeof obj.passno === "string" &&
    typeof obj.passissuedate === "string" &&
    typeof obj.passissuedep === "string" &&
    typeof obj.passissueplace === "string" &&
    typeof obj.birthdate === "string" &&
    typeof obj.birthplace === "string" &&
    typeof obj.lastmoddate === "string" &&
    typeof obj.wrongdate === "string" &&
    typeof obj.okato === "string" &&
    typeof obj.uuid === "string" &&
    typeof obj.abonentname === "string" &&
    typeof obj.abonentsurname === "string" &&
    typeof obj.abonentpatronymic === "string" &&
    typeof obj.managerid === "number" &&
    typeof obj.managername === "string" &&
    typeof obj.managerlogin === "string" &&
    typeof obj.swift === "string" &&
    typeof obj.kio === "string" &&
    typeof obj.bicbei === "string" &&
    typeof obj.iban === "string" &&
    typeof obj.bankcorr === "string" &&
    typeof obj.bankcorrcode === "string" &&
    typeof obj.bankcorraccount === "string" &&
    typeof obj.currency === "string" &&
    typeof obj.resident === "number"
  );
}

function isUserGroupFull(obj: any): obj is UserGroupFull {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.usercnt === "number" &&
    typeof obj.fread === "number" &&
    typeof obj.fwrite === "number" &&
    typeof obj.defaultgroup === "number"
    // Define further properties of usergroup if known
  );
}

function isAddressFull(obj: any): obj is AddressFull {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.type === "number" &&
    typeof obj.code === "string" &&
    typeof obj.address === "string"
  );
}

function isAgreementFull(obj: any): obj is AgreementFull {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.agrmid === "number" &&
    typeof obj.uid === "number" &&
    typeof obj.operid === "number" &&
    typeof obj.curid === "number" &&
    typeof obj.bnotify === "number" &&
    typeof obj.archive === "number" &&
    typeof obj.vgroups === "number" &&
    typeof obj.penaltymethod === "string" &&
    typeof obj.monthblockday === "string" &&
    typeof obj.agrmtype === "string" &&
    typeof obj.balance === "number" &&
    typeof obj.balanceacc === "number" &&
    typeof obj.credit === "number" &&
    typeof obj.promisecredit === "number" &&
    typeof obj.installments === "number" &&
    typeof obj.balancestrictlimit === "number" &&
    typeof obj.blimit === "number" &&
    typeof obj.balancestatus === "string" &&
    typeof obj.isauto === "number" &&
    typeof obj.friendagrmid === "number" &&
    typeof obj.parentagrmid === "number" &&
    typeof obj.paymentmethod === "number" &&
    typeof obj.blockdays === "number" &&
    typeof obj.blockmonths === "number" &&
    typeof obj.orderpayday === "number" &&
    typeof obj.blockorders === "number" &&
    typeof obj.blockamount === "number" &&
    typeof obj.priority === "number" &&
    typeof obj.ownerid === "number" &&
    typeof obj.isdefault === "number" &&
    typeof obj.nofinblock === "number" &&
    typeof obj.friendnumber === "string" &&
    typeof obj.parentnumber === "string" &&
    typeof obj.balancelimitexceeded === "string" &&
    typeof obj.number === "string" &&
    typeof obj.code === "string" &&
    typeof obj.date === "string" &&
    typeof obj.closedon === "string" &&
    typeof obj.datevalidto === "string" &&
    typeof obj.bcheck === "string" &&
    typeof obj.symbol === "string" &&
    typeof obj.username === "string" &&
    typeof obj.opername === "string" &&
    typeof obj.agreementidbopos === "string" &&
    typeof obj.descr === "string" &&
    typeof obj.balancetext === "string" &&
    typeof obj.initialbalance === "number" &&
    typeof obj.errormessage === "string"
  );
}

export const isNodeSoapAccountFullResponse = function (
  obj: any
): obj is NodeSoapAccountFullResponse {
  return (
    Array.isArray(obj) &&
    obj.length === 5 &&
    typeof obj[0] === "object" &&
    obj[0] !== null &&
    Array.isArray(obj[0].ret) &&
    obj[0].ret.length > 0 &&
    typeof obj[0].ret[0].application === "number" &&
    typeof obj[0].ret[0].billdeliveryname === "string" &&
    isAccountProfileFull(obj[0].ret[0].account) &&
    Array.isArray(obj[0].ret[0].usergroups) &&
    obj[0].ret[0].usergroups.every(isUserGroupFull) &&
    Array.isArray(obj[0].ret[0].addresses) &&
    obj[0].ret[0].addresses.every(isAddressFull) &&
    Array.isArray(obj[0].ret[0].agreements) &&
    obj[0].ret[0].agreements.every(isAgreementFull)
  );
};

function isServiceProfile(obj: any): obj is ServiceProfile {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.technicalservice === "number" &&
    typeof obj.beginperiod === "number" &&
    typeof obj.tarid === "number" &&
    typeof obj.catidx === "number" &&
    typeof obj.externalservice === "number" &&
    typeof obj.uuid === "string" &&
    typeof obj.above === "number" &&
    typeof obj.usrblockabove === "number" &&
    typeof obj.admblockabove === "number" &&
    typeof obj.permabove === "number" &&
    typeof obj.includeabove === "number" &&
    typeof obj.rentperiod === "number" &&
    typeof obj.rentperiodmonth === "number" &&
    typeof obj.descr === "string" &&
    typeof obj.archive === "number" &&
    typeof obj.catid === "number" &&
    typeof obj.servcatid === "number" &&
    typeof obj.isunique === "number" &&
    typeof obj.scriptoff === "string" &&
    typeof obj.script === "string" &&
    typeof obj.link === "string" &&
    typeof obj.autoassign === "number" &&
    typeof obj.servtypeid === "number" &&
    typeof obj.servtypename === "string" &&
    typeof obj.tarname === "string" &&
    typeof obj.saledictionaryid === "number" &&
    typeof obj.keepturnedon === "number" &&
    typeof obj.available === "number" &&
    typeof obj.usrcansetmul === "number" &&
    typeof obj.usrmaxmul === "number" &&
    typeof obj.dtvtype === "number" &&
    typeof obj.servicetype === "number" &&
    typeof obj.descrfull === "string" &&
    typeof obj.checkactivehours === "number" &&
    typeof obj.externalcharge === "number" &&
    typeof obj.currsymbol === "string" &&
    typeof obj.publicoffer === "string" &&
    typeof obj.paymentobject === "number" &&
    typeof obj.promoperiod === "number"
  );
}

export const isNodeSoapGetServiceResponse = function (
  obj: any
): obj is NodeSoapGetServiceResponse {
  return (
    Array.isArray(obj) &&
    obj.length === 5 &&
    Array.isArray(obj[0].ret) &&
    obj[0].ret.every(isServiceProfile)
  );
};

export const isNodeSoapLoginResponseHeaders = function (
  obj: any
): obj is NodeSoapLoginResponseHeaders {
  return (
    typeof obj === "object" &&
    typeof obj.server === "string" &&
    typeof obj["content-type"] === "string" &&
    typeof obj["content-length"] === "string" &&
    typeof obj.connection === "string" &&
    Array.isArray(obj["set-cookie"]) &&
    obj["set-cookie"].every((item: any) => typeof item === "string")
  );
};

export const isCookiesToken = function (obj: any): obj is CookiesToken {
  return (
    typeof obj === "object" && obj !== null && typeof obj.token === "string"
  );
};

export const isToken = function(obj: any): obj is Token {
  return typeof obj === 'object' &&
         obj !== null &&
         typeof obj['set-cookie'] === 'string' &&
         typeof obj.iat === 'number' &&
         typeof obj.exp === 'number';
}

export const isPrintCheckItem = function(obj: any): obj is PrintCheckItem {
  return (
    typeof obj.name === 'string' &&
    typeof obj.price === 'number' &&
    typeof obj.count === 'number' &&
    typeof obj.sum === 'number' &&
    typeof obj.nds_not_apply === 'boolean' &&
    typeof obj.item_type === 'number' &&
    typeof obj.payment_mode === 'number'
  );
}

export const isPrintCheckCommand = function(obj: any): obj is PrintCheckCommand {
  return (
    Array.isArray(obj.goods) &&
    obj.goods.every(isPrintCheckItem) &&
    typeof obj.author === 'string' &&
    typeof obj.tag1055 === 'string' &&
    typeof obj.payed_cash === 'number' &&
    typeof obj.payed_cashless === 'number' &&
    typeof obj.payed_credit === 'number' &&
    typeof obj.payed_prepay === 'number' &&
    typeof obj.payed_consideration === 'number'
  );
}

export const isPrintCheckResponse = function(obj: any): obj is PrintCheckResponse {
  return (
    typeof obj.command_id === 'number' &&
    typeof obj.receipt_url === 'string'
  );
}

export const isGetStatRetItem = function(obj: any): obj is GetStatRetItem {
  return (
    typeof obj.rows === 'string' &&
    typeof obj.cols === 'string' &&
    typeof obj.total === 'string' &&
    typeof obj.names === 'object' &&
    (obj.datasumm === null || typeof obj.datasumm !== 'undefined') &&
    Array.isArray(obj.data)
  );
}

export const isGetVgroupsUserInfoAddress = function(obj: any): obj is GetVgroupsUserInfoAddress {
  return (
    typeof obj.type === 'number' &&
    typeof obj.code === 'string' &&
    typeof obj.address === 'string'
  );
}

export const isGetVgroupsUserInfo = function(obj: any): obj is GetVgroupsUserInfo {
  return (
    typeof obj.templ === 'number' &&
    typeof obj.unloadtosorm === 'number' &&
    typeof obj.vgid === 'number' &&
    typeof obj.parentvgid === 'number' &&
    typeof obj.id === 'number' &&
    typeof obj.tarid === 'number' &&
    typeof obj.agrmid === 'number' &&
    typeof obj.blkreq === 'number' &&
    typeof obj.blocked === 'number' &&
    typeof obj.uid === 'number' &&
    typeof obj.agenttype === 'number' &&
    typeof obj.usercategory === 'number' &&
    typeof obj.cuid === 'number' &&
    typeof obj.dirty === 'number' &&
    typeof obj.organizationid === 'string' &&
    typeof obj.orgvgid === 'string' &&
    typeof obj.balance === 'number' &&
    typeof obj.ppdebt === 'number' &&
    typeof obj.rent === 'number' &&
    typeof obj.monthlyrent === 'number' &&
    typeof obj.totalmonthlyrent === 'number' &&
    typeof obj.dlimit === 'number' &&
    typeof obj.authmethod === 'string' &&
    typeof obj.dclear === 'string' &&
    typeof obj.login === 'string' &&
    typeof obj.descr === 'string' &&
    typeof obj.agrmnum === 'string' &&
    typeof obj.code === 'string' &&
    typeof obj.username === 'string' &&
    typeof obj.creationdate === 'string' &&
    typeof obj.accondate === 'string' &&
    typeof obj.accoffdate === 'string' &&
    typeof obj.blockdate === 'string' &&
    typeof obj.agentdescr === 'string' &&
    typeof obj.tarifdescr === 'string' &&
    typeof obj.symbol === 'string' &&
    typeof obj.parentvglogin === 'string' &&
    typeof obj.changedtariffon === 'string' &&
    typeof obj.pass === 'string' &&
    typeof obj.timestampactualcharges === 'string' &&
    (typeof obj.organizationname === 'string' || obj.organizationname === null) &&
    typeof obj.renewalstate === 'number' &&
    Array.isArray(obj.address) && obj.address.every(isGetVgroupsUserInfoAddress)
  );
}

export const isGetStatAccount = function(obj: any): obj is GetStatAccount {
  return (
    typeof obj.agent_descr === 'string' &&
    typeof obj.agent_id === 'string' &&
    typeof obj.agent_type === 'string' &&
    typeof obj.agrm_id === 'string' &&
    typeof obj.agrm_num === 'string' &&
    typeof obj.amount === 'string' &&
    typeof obj.ani === 'string' &&
    typeof obj.cat_descr === 'string' &&
    typeof obj.cat_idx === 'string' &&
    typeof obj.cause === 'string' &&
    typeof obj.curr_id === 'string' &&
    typeof obj.curr_symbol === 'string' &&
    typeof obj.delegated_prefix === 'string' &&
    typeof obj.dnis === 'string' &&
    typeof obj.dt === 'string' &&
    typeof obj.duration === 'string' &&
    typeof obj.framed_prefix === 'string' &&
    typeof obj.ip === 'string' &&
    typeof obj.nas === 'string' &&
    typeof obj.session_id === 'string' &&
    typeof obj.tar_descr === 'string' &&
    typeof obj.tar_id === 'string' &&
    typeof obj.tar_type === 'string' &&
    typeof obj.time_to === 'string' &&
    typeof obj.total === 'string' &&
    typeof obj.user_name === 'string' &&
    typeof obj.vg_id === 'string' &&
    typeof obj.vg_login === 'string' &&
    typeof obj.volume === 'string' &&
    typeof obj.volume_in === 'string' &&
    typeof obj.volume_out === 'string'
  );
}

export const isSoapResponse = function(obj: any): obj is SoapResponse {
  return (
    Array.isArray(obj) &&
    typeof obj[0] === 'object' &&
    Array.isArray(obj[0].ret) && 
    typeof obj[1] === 'string' &&
    obj[2] === undefined &&
    typeof obj[3] === 'string' &&
    obj[4] === undefined
  );
}