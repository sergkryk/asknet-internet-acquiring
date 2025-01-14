export type GetAccountsItem = {
  application: number;
  account: {
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
    vatonfiscalization: string;
    organizationid: string;
    organizationname: string | null;
    orguid: string;
  };
};

export const isGetAccountsItem = function (obj: any): obj is GetAccountsItem {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.application === 'number' &&
    typeof obj.account === 'object' &&
    obj.account !== null &&
    typeof obj.account.soleproprietor === 'boolean' &&
    typeof obj.account.uid === 'number' &&
    typeof obj.account.vgcnt === 'number' &&
    typeof obj.account.type === 'number' &&
    typeof obj.account.category === 'number' &&
    typeof obj.account.def === 'number' &&
    typeof obj.account.templ === 'number' &&
    typeof obj.account.login === 'string' &&
    typeof obj.account.name === 'string' &&
    typeof obj.account.descr === 'string' &&
    typeof obj.account.email === 'string' &&
    typeof obj.account.phone === 'string' &&
    typeof obj.account.mobile === 'string' &&
    typeof obj.account.managerid === 'number' &&
    typeof obj.account.managername === 'string' &&
    typeof obj.account.managerlogin === 'string' &&
    typeof obj.account.vatonfiscalization === 'string' &&
    typeof obj.account.organizationid === 'string' &&
    (typeof obj.account.organizationname === 'string' || obj.account.organizationname === null) &&
    typeof obj.account.orguid === 'string'
  );
}
