type GetVgroupsItemAddress = {
  type: number;
  code: string;
  address: string;
};

export type GetVgroupsItem = {
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
  address: GetVgroupsItemAddress[];
};

export type GetVgroupsItemWithPhone = GetVgroupsItem & { phone: string };

const isGetVgroupsItemAddress = function (
  obj: any
): obj is GetVgroupsItemAddress {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.type === "number" &&
    typeof obj.code === "string" &&
    typeof obj.address === "string"
  );
};

export const isGetVgroupsItem = function (obj: any): obj is GetVgroupsItem {
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
    typeof obj.organizationid === "string" &&
    typeof obj.orgvgid === "string" &&
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
    typeof obj.timestampactualcharges === "string" &&
    (typeof obj.organizationname === "string" ||
      obj.organizationname === null) &&
    typeof obj.renewalstate === "number" &&
    Array.isArray(obj.address) &&
    obj.address.every(isGetVgroupsItemAddress)
  );
};

