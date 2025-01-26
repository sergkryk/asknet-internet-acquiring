
interface SoapManager {
    notifyclient?: number; // Optional, short, default: -1
    personid: number; // Required, long
    isadmin?: number; // Optional, long, default: 0
    changepass?: number; // Optional, long, default: 0
    archive?: number; // Optional, long, default: 0
    accounts?: number; // Optional, long, default: 0
    agents?: number; // Optional, long, default: 0
    agrmgroups?: number; // Optional, long, default: 0
    actions?: number; // Optional, long, default: 0
    broadcast?: number; // Optional, long, default: 0
    calendar?: number; // Optional, long, default: 0
    cards?: number; // Optional, long, default: 0
    cardsets?: number; // Optional, long, default: 0
    cashonhand?: number; // Optional, long, default: 0
    catalog?: number; // Optional, long, default: 0
    currency?: number; // Optional, long, default: 0
    discount?: number; // Optional, long, default: 0
    helpdesk?: number; // Optional, long, default: 0
    ipstat?: number; // Optional, long, default: 0
    logs?: number; // Optional, long, default: 0
    managers?: number; // Optional, long, default: 0
    operators?: number; // Optional, long, default: 0
    optionscommon?: number; // Optional, long, default: 0
    orders?: number; // Optional, long, default: 0
    paydocs?: number; // Optional, long, default: 0
    payments?: number; // Optional, long, default: 0
    radattr?: number; // Optional, long, default: 0
    recount?: number; // Optional, long, default: 0
    reports?: number; // Optional, long, default: 0
    services?: number; // Optional, long, default: 0
    tarifs?: number; // Optional, long, default: 0
    timestat?: number; // Optional, long, default: 0
    unions?: number; // Optional, long, default: 0
    usboxstat?: number; // Optional, long, default: 0
    users?: number; // Optional, long, default: 0
    userspreorders?: number; // Optional, long, default: 0
    usergroups?: number; // Optional, long, default: 0
    hdsettings?: number; // Optional, long, default: 0
    invdevices?: number; // Optional, long, default: 0
    checkpass?: number; // Optional, long, default: 0
    optionsdocuments?: number; // Optional, long, default: 0
    optionshosts?: number; // Optional, long, default: 0
    optionsfunctions?: number; // Optional, long, default: 0
    applications?: number; // Optional, long, default: 0
    useadvance?: number; // Optional, long, default: 0
    authlogs?: number; // Optional, long, default: 0
    bso?: number; // Optional, long, default: 0
    postmans?: number; // Optional, long, default: 0
    registry?: number; // Optional, long, default: 0
    packages?: number; // Optional, long, default: 0
    clientequipment?: number; // Optional, long, default: 0
    activesessions?: number; // Optional, long, default: 0
    gifts?: number; // Optional, long, default: 0
    minutepackets?: number; // Optional, long, default: 0
    usersextfields?: number; // Optional, long, default: 0
    istemplate?: number; // Optional, unsignedLong, default: 0
    parenttemplate?: number; // Optional, long, default: -1
    saledictionary?: number; // Optional, long, default: 0
    kladr?: number; // Optional, long, default: 0
    payclassid?: number; // Optional, long, default: 0
    login: string; // Required, string
    pass?: string; // Optional, string, default: ""
    fio?: string; // Optional, string, default: ""
    email?: string; // Optional, string, default: ""
    descr?: string; // Optional, string, default: ""
    office?: string; // Optional, string, default: ""
    externalid?: string; // Optional, string, default: ""
    cashregisterfolder?: string; // Optional, string, default: ""
}

interface SoapUsergroupFull {
    usergroup: SoapUsergroup; // Required, of type SoapUsergroup
    // uids?: SoapLong[]; // Optional, unbounded array of SoapLong
    usercnt?: number; // Optional, long, default: 0
    fread?: number; // Optional, long, default: 0
    fwrite?: number; // Optional, long, default: 0
    defaultgroup?: number; // Optional, short, default: -1
}

interface SoapUsergroup {
    unloadtosorm?: number; // Optional, short, default: -1
    sormid?: number; // Optional, short, default: -1
    groupid?: number; // Optional, long, default: -1
    promiseallow?: number; // Optional, long, default: 0
    promiseallowmanager?: number; // Optional, long, default: 0
    promiserent?: number; // Optional, long, default: 0
    promisetill?: number; // Optional, long, default: 0
    promiseondays?: number; // Optional, long, default: 0
    promiseblockdays?: number; // Optional, long, default: 0
    promisemax?: number; // Optional, double, default: 0
    promisemin?: number; // Optional, double, default: 0
    promiselimit?: number; // Optional, double, default: 0
    name?: string; // Optional, string, default: ""
    description?: string; // Optional, string, default: ""
    vendorsormname?: string; // Optional, string, default: ""
    roleids?: number[]; // Optional, unbounded array of long
    uuid?: string; // Optional, string, default: ""
    uniquegroup?: number; // Optional, short, default: -1
}

interface SoapManagersTarifsStaff {
    personid?: number; // Optional, long, default: 0
    fread?: number; // Optional, long, default: 0
    fwrite?: number; // Optional, long, default: 0
    tarid: number; // Required, long
    tartype?: number; // Optional, long, default: 0
    tardescr?: string; // Optional, string, default: ""
}

interface SoapUprsPayment {
    uprscurrency: string; // Required
    paymentdate: string; // Required
    agentaccepteddate: string; // Required
    accepteddate: string; // Required
    agentoperationid: number; // Required
    paymenttooltype: number; // Required
    paymenttoolnumber: string; // Required
    checknumber: number; // Required
    terminalnumber: string; // Required
    agentsystemcode: string; // Required
    agentname: string; // Required
    subscriberid: string; // Required
}

interface SoapPaymentOrderIdName {
    orderid?: number; // Optional, long, default: 0
    ordernum?: string; // Optional, string, default: ""
}

export interface SoapPayment {
    // Required fields (minOccurs="1")
    agrmid: number; // Required
    amount: number; // Required
    // Optional fields (minOccurs="0" or default values)
    recordid?: number; // Optional, default: 0
    parentrecordid?: number; // Optional, default: 0
    modperson?: number; // Optional, default: -1
    currid?: number; // Optional, default: 0
    orderid?: number; // Optional, default: 0
    status?: number; // Optional, default: 0
    classid?: number; // Optional, default: 0
    fromagrmid?: number; // Optional, default: 0
    revno?: number; // Optional, default: 0
    revisions?: number; // Optional, default: 0
    cashcode?: number; // Optional, default: 1
    classname?: string; // Optional, default: ""
    paydate?: string; // Optional, default: ""
    localdate?: string; // Optional, default: ""
    canceldate?: string; // Optional, default: ""
    perioddate?: string; // Optional, default: ""
    receipt?: string; // Optional, default: ""
    comment?: string; // Optional, default: ""
    uuid?: string; // Optional, default: ""
    fromagrmnumber?: string; // Optional, default: ""
    paymentordernumber?: string; // Optional, default: ""
    uprs?: SoapUprsPayment[]; // Optional, unbounded array
}

export interface SoapPaymentFull {
    pay: SoapPayment; // Required, of type SoapPayment (should be defined elsewhere)
    bsodoc?: number; // Optional, long, default: 0
    timestamp?: number; // Optional, long, default: 0
    localtimestamp?: number; // Optional, long, default: 0
    amountcurr?: number; // Optional, double, default: 0
    ordernum?: string; // Optional, string, default: ""
    orders?: SoapPaymentOrderIdName[]; // Optional, unbounded array of SoapPaymentOrderIdName
    uid?: number; // Optional, long, default: 0
    operid?: number; // Optional, long, default: 0
    cardnumber?: number; // Optional, long, default: 0
    currsymb?: string; // Optional, string, default: ""
    uname?: string; // Optional, string, default: ""
    agrm?: string; // Optional, string, default: ""
    mgr?: string; // Optional, string, default: ""
    mgrdescr?: string; // Optional, string, default: ""
    mgrlogin?: string; // Optional, string, default: ""
    opername?: string; // Optional, string, default: ""
    login?: string; // Optional, string, default: ""
    iseps?: boolean; // Optional, boolean, default: false
}
export interface SoapFilter {
    exclude?: boolean; // default: false
    getdetails?: boolean; // default: false
    unloadtosorm?: number; // short, default: -1
    sormid?: number; // short, default: -1
    technicalservice?: number; // short, default: -1
    agrmarchive?: number; // short, default: -1
    active?: number; // short, default: 1
    statusid?: number; // short, default: -1
    displaydefault?: number; // short, default: -1
    clientmodifyallow?: number; // short, default: -1
    defaultnew?: number; // short, default: -1
    defaultanswer?: number; // short, default: -1
    beginperiod?: number; // short, default: -1
    requiredfield?: number; // short, default: -1
    defaultgroup?: number; // short, default: -1
    availableformanager?: number; // short, default: -1
    activated?: number; // long, default: 0
    actionid?: number; // long, default: 0
    addresstype?: number; // long, default: 1
    additional?: number; // long, default: -1
    agentid?: number; // long, default: 0
    agrmid?: number; // long, default: 0
    archive?: number; // long, default: 0
    appid?: number; // long, default: 0
    asnum?: number; // long, default: 0
    autoassign?: number; // long, default: 0
    blocked?: number; // long, default: 0
    blocktype?: number; // long, default: -1
    catid?: number; // long, default: 0
    category?: number; // long, default: -1
    catidx?: number; // long, default: -1
    servcatidx?: number; // long, default: -1
    curid?: number; // long, default: -1
    common?: number; // long, default: -1
    defaultonly?: number; // long, default: 0
    deviceid?: number; // long, default: 0
    direction?: number; // long, default: -1
    docid?: number; // long, default: 0
    durfrom?: number; // long, default: 0
    durto?: number; // long, default: 0
    enabled?: number; // long, default: 0
    freetarifs?: number; // long, default: 0
    groupid?: number; // long, default: 0
    groups?: number; // long, default: 0
    istemplate?: number; // long, default: 0
    includes?: number; // long, default: 0
    mgrid?: number; // long, default: -1
    needcalc?: number; // long, default: -1
    nodata?: number; // long, default: 0
    nodetails?: number; // long, default: 0
    notgroups?: number; // long, default: -1
    onfly?: number; // long, default: 0
    operid?: number; // long, default: 0
    orderid?: number; // long, default: 0
    ordernum?: string; // default: ""
    payed?: number; // long, default: -1
    payable?: number; // long, default: -1
    parentid?: number; // long, default: -1
    packetid?: number; // long, default: 0
    personid?: number; // long, default: -1
    pgnum?: number; // long, default: 0
    pgsize?: number; // long, default: 0
    port?: number; // long, default: 0
    includepreactivated?: number; // long, default: -1
    proto?: number; // long, default: 0
    receipt?: string; // Optional, default: ""
    recordid?: number; // long, default: 0
    recordidend?: number; // long, default: -1
    rentperiod?: number; // long, default: -1
    repdetail?: number; // long, default: 0
    repnum?: number; // long, default: 0
    servid?: number; // long, default: -2
    serviceid?: number; // long, default: 0
    setid?: number; // long, default: 0
    shape?: number; // long, default: 0
    showdefault?: number; // long, default: 0
    skipduplicate?: number; // long, default: 0
    soleproprietor?: number; // long, default: -1
    state?: number; // long, default: -1
    tarid?: number; // long, default: 0
    parenttarid?: number; // long, default: -1
    taridprev?: number; // long, default: 0
    tartype?: number; // long, default: -1
    type?: number; // long, default: 0
    ugroups?: number; // long, default: -1
    unavail?: number; // long, default: -1
    userid?: number; // long, default: 0
    vgid?: number; // long, default: 0
    vlan?: number; // long, default: 0
    showservices?: number; // long, default: -1
    servicetype?: number; // long, default: -1
    dtvtype?: number; // long, default: -1
    payhistory?: number; // long, default: 0
    hasregistry?: number; // long, default: -1
    isemail?: number; // long, default: 0
    issms?: number; // long, default: 0
    totalsumm?: number; // long, default: -1
    peopleid?: number; // long, default: 0
    country?: number; // long, default: 0
    region?: number; // long, default: 0
    area?: number; // long, default: 0
    city?: number; // long, default: 0
    settl?: number; // long, default: 0
    street?: number; // long, default: 0
    building?: number; // long, default: 0
    entrance?: number; // long, default: 0
    floor?: number; // long, default: 0
    flat?: number; // long, default: 0
    position?: number; // long, default: 0
    doctype?: number; // long, default: -1
    outervlan?: number; // long, default: -1
    innervlan?: number; // long, default: -1
    showonhp?: number; // long, default: -1
    paymentobject?: number; // long, default: -1
    externalcharge?: number; // long, default: -1
    externalservice?: number; // long, default: -1
    isunique?: number; // long, default: -1
    prototypeid?: number; // long, default: 0
    policyid?: number; // long, default: 0
    vlanid?: number; // long, default: 0
    postmanid?: number; // unsignedLong, default: 0
    allowblockcalls?: number; // short, default: -1
    above?: number; // double, default: 0
    admblockabove?: number; // double, default: 0
    amountfrom?: number; // double, default: 0
    amountto?: number; // double, default: 0
    usrblockabove?: number; // double, default: 0
    mul?: number; // double, default: 0
    externaldata?: string; // default: ""
    comment?: string; // default: ""
}
export interface SoapManagerFull {
    manager: SoapManager; // Required, of type SoapManager
    usergroups?: SoapUsergroupFull[]; // Optional, array of SoapUsergroupFull
    mantarifs?: SoapManagersTarifsStaff[]; // Optional, array of SoapManagersTarifsStaff
}
export interface SoapIdName {
    id: number; // Required, long
    name?: string; // Optional, string, default: ""
    data?: number; // Optional, long, default: 0
}
export interface TariffFilter {
    archive?: 0 | 1; // Optional, long: Include archived tariffs (flag: 0/1)
    unavail?: 0 | 1; // Optional, long: Include unavailable tariffs (flag: 0/1)
  }
export interface CancelPaymentParams {
    receipt: string;
    agrmid: number;
    recordid: number;
}
export interface LoginParams {
    login: string;
    pass: string;
}
