
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
export interface ClientLoginParams {
    login: string;
    pass: string;
}
export interface SoapClientLogin {
    uid: number; // Required, xsd:long
    timelastlogin: string; // Required, xsd:string
}
export interface SoapAccount {
    uid: number; // Required, xsd:long
    type: number; // Required, xsd:long
    login: string; // Required, xsd:string
    doctype?: number;
    ipaccess?: number;
    billdelivery?: number;
    category?: number;
    oksm?: number;
    templ?: number;
    wrongactive?: number;
    archive?: number;
    ownership?: number;
    mobileisconfirmed?: boolean;
    emailisconfirmed?: boolean;
    offerisaccepted?: boolean;
    soleproprietor?: boolean;
    pass?: string;
    passtype?: number;
    descr?: string;
    name?: string;
    phone?: string;
    fax?: string;
    email?: string;
    mobile?: string;
    bankname?: string;
    branchbankname?: string;
    treasuryname?: string;
    treasuryaccount?: string;
    bik?: string;
    settl?: string;
    corr?: string;
    kpp?: string;
    inn?: string;
    ogrn?: string;
    okpo?: string;
    okved?: string;
    gendiru?: string;
    glbuhgu?: string;
    kontperson?: string;
    actonwhat?: string;
    passsernum?: string;
    passno?: string;
    passissuedate?: string;
    passissuedep?: string;
    passissueplace?: string;
    birthdate?: string;
    birthplace?: string;
    lastmoddate?: string;
    wrongdate?: string;
    okato?: string;
    uuid?: string;
    abonentname?: string;
    abonentsurname?: string;
    abonentpatronymic?: string;
    managerid?: number;
    managername?: string;
    managerlogin?: string;
    swift?: string;
    kio?: string;
    bicbei?: string;
    iban?: string;
    bankcorr?: string;
    bankcorrcode?: string;
    bankcorraccount?: string;
    currency?: string;
    resident?: number;
    organizationid?: number;
    orguid?: number;
    organizationname?: string;
}
export interface SoapAddressBrief {
    type: number; // Required, xsd:long
    code: string; // Required, xsd:string
    address: string; // Required, xsd:string
    buildinguuid: string; // Required, xsd:string
}
export interface SoapAgreement {
    agrmid: number; // Required, xsd:long
    uid: number; // Required, xsd:long
    operid: number; // Required, xsd:long
    curid: number; // Required, xsd:long

    bnotify?: number;
    archive?: number;
    vgroups?: number;
    penaltymethod?: number;
    monthblockday?: number;
    agrmtype?: number;
    balance?: number;
    balanceacc?: number;
    credit?: number;
    promisecredit?: number;
    installments?: number;
    balancestrictlimit?: number;
    blimit?: number;
    balancestatus?: number;
    isauto?: number;
    friendagrmid?: number;
    parentagrmid?: number;
    paymentmethod?: number;
    blockdays?: number;
    blockmonths?: number;
    orderpayday?: number;
    blockorders?: number;
    blockamount?: number;
    priority?: number;
    ownerid?: number;
    isdefault?: number;
    organizationid?: number;
    orgagrmid?: number;
    nofinblock?: number;

    friendnumber?: string;
    parentnumber?: string;
    balancelimitexceeded?: string;
    number?: string;
    code?: string;
    date?: string;
    closedon?: string;
    datevalidto?: string;
    bcheck?: string;
    symbol?: string;
    username?: string;
    opername?: string;
    agreementidbopos?: string;
    descr?: string;
    balancetext?: string;
    organizationname?: string;
    initialbalance?: number;
    errormessage?: string;

    addons?: SoapAgreementAddon[]; // Optional, unbounded array
}
interface SoapAccountAddon {
    type: number;
    name: string;
    uid?: number;
    idx?: number;
    descr?: string;
    strvalue?: string;
}
interface SoapAgreementAddon {
    agrmid: number;
    type: number;
    idx: number;
    name: string;
    descr: string;
    strvalue: string;
}
export interface SoapAccountFull {
    application?: number; // Optional, xsd:long
    billdeliveryname?: string; // Optional, xsd:string (default: "")
    account: SoapAccount; // Required, lbapi:soapAccount
    usergroups?: SoapUsergroupFull[]; // Optional, unbounded array
    addresses?: SoapAddressBrief[]; // Optional, unbounded array
    agreements: SoapAgreement[]; // Optional, unbounded array
    addons?: SoapAccountAddon[]; // Optional, unbounded array
    delfromgroups?: number[]; // Optional, unbounded array of xsd:long
}
interface SoapTarif {
    tarid: number;
    actualtarid?: number;
    shape?: number;
    trafflimit?: number;
    trafflimitper?: number;
    type?: number;
    actblock?: number;
    archive?: number;
    priceplan?: number;
    trafftype?: number;
    dailyrent?: number;
    dynamicrent?: number;
    shapeprior?: number;
    unavaliable?: number;
    rentmultiply?: number;
    chargeincoming?: number;
    curid?: number;
    used?: number;
    voipblocklocal?: number;
    dynroute?: number;
    servicetype?: number;
    blockrentduration?: number;
    rent?: number;
    blockrent?: number;
    usrblockrent?: number;
    admblockrent?: number;
    coeflow?: number;
    coefhigh?: number;
    catnumbers?: number[]; // Assuming lbapi:soapLong maps to an array of numbers
    descr?: string;
    descrfull?: string;
    symbol?: string;
    link?: string;
    uuid?: string | null; // Since it's nillable
    saledictionaryid?: number;
    additional?: number;
    commonincludes?: number;
    usecommonincludes?: number;
    checkactivehours?: number;
    rentasservice?: number;
    availablefl?: number;
    availableul?: number;
    organizationid?: number;
    orgtarid?: number;
    organizationname?: string;
}
interface SoapTariffsSettingsRentAsService {
    includeabove?: number; // Corresponds to xsd:double
    rentperiod?: number; // Corresponds to xsd:short
    rentperiodmonth?: number; // Corresponds to xsd:short
    beginperiod?: number; // Corresponds to xsd:short
    rent?: number; // Corresponds to xsd:double
    blockrent?: number; // Corresponds to xsd:double
    usrblockrent?: number; // Corresponds to xsd:double
    admblockrent?: number; // Corresponds to xsd:double
}
interface SoapSizeShape {
    id: number; // Required, corresponds to xsd:long
    tarid: number; // Required, corresponds to xsd:long
    amount: number; // Required, corresponds to xsd:long
    shaperate: number; // Required, corresponds to xsd:long
}
interface SoapTimeShape {
    id: number; // Required, corresponds to xsd:long
    tarid: number; // Required, corresponds to xsd:long
    shaperate: number; // Required, corresponds to xsd:long
    sun: number; // Required, corresponds to xsd:long
    mon: number; // Required, corresponds to xsd:long
    tue: number; // Required, corresponds to xsd:long
    wed: number; // Required, corresponds to xsd:long
    thu: number; // Required, corresponds to xsd:long
    fri: number; // Required, corresponds to xsd:long
    sat: number; // Required, corresponds to xsd:long
    useweekend: number; // Required, corresponds to xsd:long
    timefrom: string; // Required, corresponds to xsd:string
    timeto: string; // Required, corresponds to xsd:string
}
interface SoapTariffsAddon {
    tarid: number; // Required, corresponds to xsd:long
    type: number; // Required, corresponds to xsd:long
    tarifftype: number; // Required, corresponds to xsd:long
    idx: number; // Required, corresponds to xsd:long
    name: string; // Required, corresponds to xsd:string
    descr: string; // Required, corresponds to xsd:string
    strvalue: string; // Required, corresponds to xsd:string
}
export interface SoapTarifFull {
    tarif: SoapTarif; // Required, corresponds to lbapi:soapTarif
    sizeshapes?: SoapSizeShape[]; // Optional array, corresponds to lbapi:soapSizeShape
    timeshapes?: SoapTimeShape[]; // Optional array, corresponds to lbapi:soapTimeShape
    addons?: SoapTariffsAddon[]; // Optional array, corresponds to lbapi:soapTariffsAddon
    settingsrentasservice: SoapTariffsSettingsRentAsService; // Required, corresponds to lbapi:soapTariffsSettingsRentAsService
}
interface SoapCurrentModifier {
    type?: string; // Corresponds to xsd:string, optional
    value?: number; // Corresponds to xsd:double, optional
}
interface SoapClientVgroup {
    agrmid?: number; // Corresponds to xsd:long, optional
    vgid?: number; // Corresponds to xsd:long, optional
    blkreq?: number; // Corresponds to xsd:long, optional
    blocked?: number; // Corresponds to xsd:long, optional
    changed?: number; // Corresponds to xsd:long, optional
    agentid?: number; // Corresponds to xsd:long, optional
    tarifid: number; // Corresponds to xsd:long, optional
    tariftype?: number; // Corresponds to xsd:long, optional
    curshape?: number; // Corresponds to xsd:long, optional
    usesmartcards?: number; // Corresponds to xsd:long, optional
    usecas?: number; // Corresponds to xsd:long, optional
    radiusinsertmacstaff?: number; // Corresponds to xsd:long, optional
    multiply?: number; // Corresponds to xsd:long, optional
    servicerent?: number; // Corresponds to xsd:double, optional
    servicevolume?: number; // Corresponds to xsd:long, optional
    serviceusedin?: number; // Corresponds to xsd:long, optional
    serviceusedout?: number; // Corresponds to xsd:long, optional
    agentdescr?: string; // Corresponds to xsd:string, optional
    tarifdescr?: string; // Corresponds to xsd:string, optional
    login?: string; // Corresponds to xsd:string, optional
    currentmodifier?: SoapCurrentModifier; // Corresponds to lbapi:soapCurrentModifier, optional
}
interface SoapTarifsRasp {
    force?: number; // Corresponds to xsd:short, optional
    recordid: number; // Corresponds to xsd:long, required
    vgid: number; // Corresponds to xsd:long, required
    agrmid?: number; // Corresponds to xsd:long, optional
    groupid?: number; // Corresponds to xsd:long, optional
    uid?: number; // Corresponds to xsd:long, optional
    id: number; // Corresponds to xsd:long, required
    taridnew: number; // Corresponds to xsd:long, required
    taridold: number; // Corresponds to xsd:long, required
    agenttype?: number; // Corresponds to xsd:long, optional
    tarnewcurid?: number; // Corresponds to xsd:long, optional
    taroldcurid?: number; // Corresponds to xsd:long, optional
    override?: number; // Corresponds to xsd:long, optional
    requestby: string; // Corresponds to xsd:string, required
    changetime: string; // Corresponds to xsd:string, required
    timeto?: string; // Corresponds to xsd:string, optional
    vglogin?: string; // Corresponds to xsd:string, optional
    agrmnum?: string; // Corresponds to xsd:string, optional
    code?: string; // Corresponds to xsd:string, optional
    accname?: string; // Corresponds to xsd:string, optional
    agentname?: string; // Corresponds to xsd:string, optional
    tarnewname?: string; // Corresponds to xsd:string, optional
    taroldname?: string; // Corresponds to xsd:string, optional
    mgrname?: string; // Corresponds to xsd:string, optional
    tarnewsymbol?: string; // Corresponds to xsd:string, optional
    taroldsymbol?: string; // Corresponds to xsd:string, optional
    keepallmodifiers?: number; // Corresponds to xsd:long, optional
    keeptarmodifier?: number; // Corresponds to xsd:long, optional
    discount?: number; // Corresponds to xsd:double, optional
    absdiscount?: number; // Corresponds to xsd:double, optional
    absblockdiscount?: number; // Corresponds to xsd:double, optional
    rent?: number; // Corresponds to xsd:double, optional
    blockrent?: number; // Corresponds to xsd:double, optional
    servcatidx?: number; // Corresponds to xsd:long, optional
    tarnewrentasservice?: boolean; // Corresponds to xsd:boolean, optional
    catdiscounts?: SoapCategoryDiscount[]; // Corresponds to lbapi:soapCategoryDiscount, optional array
}
interface SoapCategoryDiscount {
    catidx?: number;
    discount?: number;
    above?: number;
    rate?: number;
    includes?: number;
    parentrecordid?: number;
    keepmodifier?: number;
}
interface SoapStaff {
    recordid?: number;
    vgid?: number;
    equipid?: number;
    type: number;
    as?: number;
    servid?: number;
    servcatidx?: number;
    createservice?: boolean;
    ipmask?: SoapIPMask;
}
interface SoapIPMask {
    ip?: string;
    mask?: number;
    prefix?: number;
    segmentid?: number;
}
interface SoapTelStaff {
    recordid?: number;
    vgid?: number;
    device?: number;
    ldservice?: number;
    phonerangeid?: number;
    phonenumber: string;
    comment?: string;
    timefrom?: string;
    timeto?: string;
    serviceid?: number;
}
interface SoapMacStaff {
    macid?: number;
    recordid?: number;
    vgid: number;
    segment?: string;
    mac: string;
}
interface SoapTarifsStaff {
    groupid: number;
    grouptarid: number;
    groupmoduleid: number;
    tarid: number;
    tartype?: number;
    tarcurid?: number;
    shape?: number;
    rent?: number;
    tarname?: string;
    tarsymbol?: string;
    tardescrfull?: string;
}
interface SoapTurboShape {
    recordid: number;
    vgid: number;
    servid?: number;
    tarid?: number;
    catidx?: number;
    shape?: number;
    timefrom?: string;
    timeto?: string;
    descr?: string;
    login?: string;
}
interface SoapVgroupAddon {
    vgid: number;
    type: number;
    agentid: number;
    idx: number;
    name: string;
    descr: string;
    strvalue: string;
}
interface SoapBlockRasp {
    recordid?: number;
    vgid?: number;
    groupid?: number;
    blkreq?: number;
    id?: number;
    ishistory?: number;
    isfreewill?: number;
    requestby?: number;
    unblockedby?: number;
    agrmid?: number;
    uid?: number;
    changetime?: string;
    managerlogin?: string;
    mgrname?: string;
    mgrdescr?: string;
    comment?: string;
    timeto?: string;
    login?: string;
    unblockedmanagerlogin?: string;
    unblockedmanagername?: string;
    unblockedmanagerdescr?: string;
    agrmnum?: string;
    username?: string;
}
export interface SoapClientVgroupFull {
    vgroup: SoapClientVgroup; // Required, corresponds to lbapi:soapClientVgroup
    tarrasp?: SoapTarifsRasp[]; // Optional array, corresponds to lbapi:soapTarifsRasp
    staff?: SoapStaff[]; // Optional array, corresponds to lbapi:soapStaff
    telstaff?: SoapTelStaff[]; // Optional array, corresponds to lbapi:soapTelStaff
    macstaff?: SoapMacStaff[]; // Optional array, corresponds to lbapi:soapMacStaff
    tarstaff?: SoapTarifsStaff[]; // Optional array, corresponds to lbapi:soapTarifsStaff
    turboshape?: SoapTurboShape[]; // Optional array, corresponds to lbapi:soapTurboShape
    addons?: SoapVgroupAddon[]; // Optional array, corresponds to lbapi:soapVgroupAddon
    blockrasp?: SoapBlockRasp[]; // Optional array, corresponds to lbapi:soapBlockRasp
    addresses?: SoapAddressBrief[]; // Optional array, corresponds to lbapi:soapAddressBrief
}
export interface SoapServiceCategory {
    technicalservice?: boolean;            // Флаг «Служебная услуга»
    beginperiod?: number;                  // Дата начала расчетного периода (0, 1, 2, 3)
    tarid: number;                         // Идентификатор тарифа
    catidx: number;                        // Идентификатор категории тарифа (уникален в рамках тарифа)
    externalservice?: boolean;             // Флаг «Внешняя услуга»
    uuid: string;                          // Код для связки с внешней системой
    above: number;                         // Стоимость услуги в валюте тарифа
    usrblockabove: number;                 // Стоимость при пользовательской блокировке
    admblockabove: number;                 // Стоимость при административной блокировке
    permabove: number;                     // Стоимость при финансовой блокировке
    includeabove: number;                  // Стоимость подключения услуги
    rentperiod: number;                    // Периодичность списания услуги (0, 1, 2, 3)
    rentperiodmonth?: number;              // Периодичность списания для настройки «один раз в N месяцев»
    descr: string;                         // Описание категории
    archive?: boolean;                     // Флаг «Категория удалена»
    catid: number;                         // Идентификатор каталога, которому принадлежит запись
    servcatid: number;                     // Ссылка на каталог
    isunique: boolean;                     // Флаг «Уникальная услуга»
    scriptoff?: string;                    // Скрипт при отключении услуги
    script?: string;                       // Скрипт при назначении услуги
    link?: string;                         // Ссылка на подробное описание услуги
    autoassign: number;                    // Флаг автоматического назначения услуги при смене тарифа
    servtypeid: number;                    // Идентификатор типа услуг
    servtypename: string;                  // Наименование типа услуг
    tarname: string;                       // Описание тарифа
    saledictionaryid?: number;             // Идентификатор услуги, связанной с категорией
    keepturnedon?: boolean;                // Флаг отключения пакета ЦТВ
    available?: boolean;                   // Возможность назначать или отменять подписку на сервис в ЛК
    usrcansetmul?: boolean;                // Возможность изменить количество услуг в ЛК
    usrmaxmul?: number;                    // Максимальное количество услуг в ЛК
    dtvtype?: number;                      // Тип услуги ЦТВ (0-8)
    servicetype: number;                   // Тип услуги (0 — основная, 1 — дополнительная)
    descrfull?: string;                    // Подробное описание услуги
    checkactivehours?: boolean;            // Учитывать 12-часовой порог при тарификации
    externalcharge?: boolean;              // Тип тарификации (внешняя или обычное поведение)
    currsymbol?: string;                   // Сокращённое обозначение валюты
    publicoffer?: string;                  // Ссылка на публичную оферту
    paymentobject?: number;                // Предмет расчёта (для фискализации)
    promoperiod?: number;                  // Пробный период
    defaultsubscriptionfee?: boolean;      // Флаг «Абонентская плата по умолчанию»
    forcedchangedefaultsubscrfee?: boolean; // Принудительно изменить флаг абонентской платы по умолчанию
    availableformanager?: boolean;         // Менеджеру разрешено управлять услугой
  }