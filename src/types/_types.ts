import { Request } from "express";
import NodeSoap from "../soap/soap";

export interface ICitypaySmsInformer {
  req: Request;
  soapModel: NodeSoap;
  informViaSms(type: "pay" | "cancel"): Promise<void>;
}

export type citipayQueryTypes = "check" | "pay" | "cancel";

export type PaymentArguments = {
  agrmid: string;
  amount: string;
  modperson?: string;
  comment?: string;
  transactionId?: string;
  uuid?: string;
};

export type PayFormBody = {
  agrmid: string;
  sum: string;
  phone: string;
  token: {
    "set-cookie": string;
    iat: string;
    exp: string;
  };
};

export type CitypayQuery = {
  QueryType: "check" | "pay" | "cancel";
  TransactionId: string;
  TransactionDate?: string;
  Account: string;
  Amount: string;
  comment?: string;
};

export type CitypayCheck = {
  QueryType: "check" | "pay" | "cancel";
  TransactionId: string;
  Account: string;
};

export type SMSoptions = {
  number: string;
  message: string;
  isTest?: boolean;
};

export type PaydayQuery = {
  CheckDateBegin: string;
  CheckDateEnd: string;
};

export type ManagerProfile = {
  notifyclient: number;
  personid: number;
  isadmin: number;
  changepass: number;
  archive: number;
  accounts: number;
  agents: number;
  agrmgroups: number;
  actions: number;
  broadcast: number;
  calendar: number;
  cards: number;
  cardsets: number;
  cashonhand: number;
  catalog: number;
  currency: number;
  discount: number;
  helpdesk: number;
  ipstat: number;
  logs: number;
  managers: number;
  operators: number;
  optionscommon: number;
  orders: number;
  paydocs: number;
  payments: number;
  radattr: number;
  recount: number;
  reports: number;
  services: number;
  tarifs: number;
  timestat: number;
  unions: number;
  usboxstat: number;
  users: number;
  userspreorders: number;
  usergroups: number;
  hdsettings: number;
  invdevices: number;
  checkpass: number;
  optionsdocuments: number;
  optionshosts: number;
  optionsfunctions: number;
  applications: number;
  useadvance: number;
  authlogs: number;
  bso: number;
  postmans: number;
  registry: number;
  packages: number;
  clientequipment: number;
  activesessions: number;
  gifts: number;
  minutepackets: number;
  usersextfields: number;
  istemplate: string;
  parenttemplate: number;
  saledictionary: number;
  kladr: number;
  payclassid: number;
  login: string;
  pass: string;
  fio: string;
  email: string;
  descr: string;
  office: string;
  externalid: string;
  cashregisterfolder: string;
};

export type VgroupProfile = {
  templ: number;
  unloadtosorm: number;
  vgid: number;
  parentvgid: number;
  id: number;
  tarid: number;
  agrmid: number;
  blkreq: number;
  blocked: number;
  uid: number;
  agenttype: number;
  usercategory: number;
  cuid: number;
  dirty: number;
  balance: number;
  ppdebt: number;
  rent: number;
  monthlyrent: number;
  totalmonthlyrent: number;
  dlimit: number;
  authmethod: string;
  dclear: string;
  login: string;
  descr: string;
  agrmnum: string;
  code: string;
  username: string;
  creationdate: string;
  accondate: string;
  accoffdate: string;
  blockdate: string;
  agentdescr: string;
  tarifdescr: string;
  symbol: string;
  parentvglogin: string;
  changedtariffon: string;
  pass: string;
  address: any[]; // Specify the type if you have more details about the address structure
  renewalstate: number;
};

export type AccountProfile = {
  soleproprietor: boolean;
  uid: number;
  vgcnt: number;
  type: number;
  category: number;
  def: number;
  templ: number;
  login: string;
  name: string;
  descr: string;
  email: string;
  phone: string;
  mobile: string;
  managerid: number;
  managername: string;
  managerlogin: string;
};

export type GetPaymentsPayRecord = {
  recordid: number;
  parentrecordid: number;
  agrmid: number;
  modperson: number;
  currid: number;
  orderid: number;
  status: number;
  classid: number;
  amount: number;
  fromagrmid: number;
  revno: number;
  revisions: number;
  cashcode: number;
  classname: string;
  paydate: string;
  localdate: string;
  canceldate: string;
  perioddate: string;
  receipt: string;
  comment: string;
  uuid: string;
  fromagrmnumber: string;
  paymentordernumber: string;
};

export type GetPaymentsProfile = {
  pay: GetPaymentsPayRecord;
  bsodoc: number;
  timestamp: number;
  localtimestamp: number;
  amountcurr: number;
  ordernum: string;
  uid: number;
  operid: number;
  cardnumber: number;
  currsymb: string;
  uname: string;
  agrm: string;
  mgr: string;
  mgrdescr: string;
  mgrlogin: string;
  opername: string;
  login: string;
  iseps: boolean;
};

export type NodeSoapLoginResponse = [
  { ret: [{ manager: ManagerProfile }] },
  string,
  undefined | string,
  string,
  undefined
];

export type NodeSoapVgroupResponse = [
  { ret: [VgroupProfile] },
  string,
  undefined | string,
  string,
  undefined
];

export type NodeSoapAccountResponse = [
  { ret: [{ application: 0; account: AccountProfile }] },
  string,
  undefined | string,
  string,
  undefined
];

export type NodeSoapPaymentResponse = [
  { ret: number },
  string,
  string | undefined,
  string,
  string | undefined
];

export type NodeSoapGetPaymentsResponse = [
  { ret: [GetPaymentsProfile] },
  string,
  string | undefined,
  string,
  string | undefined
];

export type NodeSoapGetPaymentsPaydayResponse = [
  { ret: GetPaymentsProfile[] },
  string,
  string | undefined,
  string,
  string | undefined
];

export type NodeSoapClientLoginResponse = [
  { ret: [{ uid: number; timelastlogin: string }] },
  string,
  string | undefined,
  string,
  string | undefined
];

export type AccountProfileFull = {
  uid: number;
  doctype: number;
  ipaccess: number;
  billdelivery: number;
  category: number;
  type: number;
  oksm: number;
  templ: number;
  wrongactive: number;
  archive: number;
  ownership: number;
  mobileisconfirmed: boolean;
  emailisconfirmed: boolean;
  offerisaccepted: boolean;
  soleproprietor: boolean;
  login: string;
  pass: string;
  descr: string;
  name: string;
  phone: string;
  fax: string;
  email: string;
  mobile: string;
  bankname: string;
  branchbankname: string;
  treasuryname: string;
  treasuryaccount: string;
  bik: string;
  settl: string;
  corr: string;
  kpp: string;
  inn: string;
  ogrn: string;
  okpo: string;
  okved: string;
  gendiru: string;
  glbuhgu: string;
  kontperson: string;
  actonwhat: string;
  passsernum: string;
  passno: string;
  passissuedate: string;
  passissuedep: string;
  passissueplace: string;
  birthdate: string;
  birthplace: string;
  lastmoddate: string;
  wrongdate: string;
  okato: string;
  uuid: string;
  abonentname: string;
  abonentsurname: string;
  abonentpatronymic: string;
  managerid: number;
  managername: string;
  managerlogin: string;
  swift: string;
  kio: string;
  bicbei: string;
  iban: string;
  bankcorr: string;
  bankcorrcode: string;
  bankcorraccount: string;
  currency: string;
  resident: number;
};

export type UserGroupFull = {
  usergroup: Object; // Define properties if known
  usercnt: number;
  fread: number;
  fwrite: number;
  defaultgroup: number;
};

export type AddressFull = {
  type: number;
  code: string;
  address: string;
};

export type AgreementFull = {
  agrmid: number;
  uid: number;
  operid: number;
  curid: number;
  bnotify: number;
  archive: number;
  vgroups: number;
  penaltymethod: string;
  monthblockday: string;
  agrmtype: string;
  balance: number;
  balanceacc: number;
  credit: number;
  promisecredit: number;
  installments: number;
  balancestrictlimit: number;
  blimit: number;
  balancestatus: string;
  isauto: number;
  friendagrmid: number;
  parentagrmid: number;
  paymentmethod: number;
  blockdays: number;
  blockmonths: number;
  orderpayday: number;
  blockorders: number;
  blockamount: number;
  priority: number;
  ownerid: number;
  isdefault: number;
  nofinblock: number;
  friendnumber: string;
  parentnumber: string;
  balancelimitexceeded: string;
  number: string;
  code: string;
  date: string;
  closedon: string;
  datevalidto: string;
  bcheck: string;
  symbol: string;
  username: string;
  opername: string;
  agreementidbopos: string;
  descr: string;
  balancetext: string;
  initialbalance: number;
  errormessage: string;
};

export type NodeSoapAccountFullResponse = [
  {
    ret: [
      {
        application: number;
        billdeliveryname: string;
        account: AccountProfileFull;
        usergroups: UserGroupFull[];
        addresses: AddressFull[];
        agreements: AgreementFull[];
      }
    ];
  },
  string,
  string | undefined,
  string,
  string | undefined
];

export type ServiceProfile = {
  technicalservice: number;
  beginperiod: number;
  tarid: number;
  catidx: number;
  externalservice: number;
  uuid: string;
  above: number;
  usrblockabove: number;
  admblockabove: number;
  permabove: number;
  includeabove: number;
  rentperiod: number;
  rentperiodmonth: number;
  descr: string;
  archive: number;
  catid: number;
  servcatid: number;
  isunique: number;
  scriptoff: string;
  script: string;
  link: string;
  autoassign: number;
  servtypeid: number;
  servtypename: string;
  tarname: string;
  saledictionaryid: number;
  keepturnedon: number;
  available: number;
  usrcansetmul: number;
  usrmaxmul: number;
  dtvtype: number;
  servicetype: number;
  descrfull: string;
  checkactivehours: number;
  externalcharge: number;
  currsymbol: string;
  publicoffer: string;
  paymentobject: number;
  promoperiod: number;
};

export type NodeSoapGetServiceResponse = [
  { ret: ServiceProfile[] },
  string,
  string | undefined,
  string,
  string | undefined
];

export type NodeSoapLoginResponseHeaders = {
  server: string;
  "content-type": string;
  "content-length": string;
  connection: string;
  "set-cookie": string[];
};

export type CookiesToken = {
  token: string;
};

export type Token = {
  "set-cookie": string;
  iat: number;
  exp: number;
};

export type PrintCheckItem = {
  name: string;
  price: number;
  count: number;
  sum: number;
  nds_not_apply: boolean;
  item_type: number;
  payment_mode: number;
};

export type PrintCheckCommand = {
  goods: PrintCheckItem[];
  author: string;
  tag1055: string;
  smsEmail54FZ: string;
  payed_cash: number;
  payed_cashless: number;
  payed_credit: number;
  payed_prepay: number;
  payed_consideration: number;
};

export type PrintCheckResponse = {
  command_id: number;
  receipt_url: string;
};

export type GetVgroupsUserInfoAddress = {
  type: number;
  code: string;
  address: string;
};

export type GetVgroupsUserInfo = {
  templ: number;
  unloadtosorm: number;
  vgid: number;
  parentvgid: number;
  id: number;
  tarid: number;
  agrmid: number;
  blkreq: number;
  blocked: number;
  uid: number;
  agenttype: number;
  usercategory: number;
  cuid: number;
  dirty: number;
  organizationid: string;
  orgvgid: string;
  balance: number;
  ppdebt: number;
  rent: number;
  monthlyrent: number;
  totalmonthlyrent: number;
  dlimit: number;
  authmethod: string;
  dclear: string;
  login: string;
  descr: string;
  agrmnum: string;
  code: string;
  username: string;
  creationdate: string;
  accondate: string;
  accoffdate: string;
  blockdate: string;
  agentdescr: string;
  tarifdescr: string;
  symbol: string;
  parentvglogin: string;
  changedtariffon: string;
  pass: string;
  timestampactualcharges: string;
  organizationname: string | null;
  renewalstate: number;
  address: GetVgroupsUserInfoAddress[];
};

export type GetStatRetItem = {
  rows: string;
  cols: string;
  total: string;
  names: any; // You mentioned [Object], so assuming it's dynamic, using `any`. If you know its structure, specify the type.
  datasumm: any | null;
  data: any[]; // You mentioned [Array], so assuming it's an array of dynamic content, using `any[]`. If you know the type, define it here.
};

export type GetStatRetResponse = [
  {
    ret: GetStatRetItem[];
  },
  string,
  undefined,
  string,
  undefined
];

export type GetStatAccount = {
  agent_descr: string;
  agent_id: string;
  agent_type: string;
  agrm_id: string;
  agrm_num: string;
  amount: string;
  ani: string;
  cat_descr: string;
  cat_idx: string;
  cause: string;
  curr_id: string;
  curr_symbol: string;
  delegated_prefix: string;
  dnis: string;
  dt: string;
  duration: string;
  framed_prefix: string;
  ip: string;
  nas: string;
  session_id: string;
  tar_descr: string;
  tar_id: string;
  tar_type: string;
  time_to: string;
  total: string;
  user_name: string;
  vg_id: string;
  vg_login: string;
  volume: string;
  volume_in: string;
  volume_out: string;
}

export type SoapResponse = [
  {
    ret: any[]; // The 'ret' property contains an array of RetItems.
  },
  string,      // The second element is a string (XML response)
  undefined,   // The third element is undefined
  string,      // The fourth element is a string (XML request)
  undefined    // The fifth element is undefined
];
