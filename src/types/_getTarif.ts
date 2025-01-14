type Tarif = {
  tarid: number;
  actualtarid: number;
  shape: number;
  trafflimit: number;
  trafflimitper: number;
  type: number;
  actblock: number;
  archive: number;
  priceplan: number;
  trafftype: number;
  dailyrent: number;
  dynamicrent: number;
  shapeprior: number;
  unavaliable: number;
  rentmultiply: number;
  chargeincoming: number;
  curid: number;
  used: number;
  voipblocklocal: number;
  dynroute: number;
  servicetype: number;
  blockrentduration: string;
  rent: number;
  blockrent: number;
  usrblockrent: number;
  admblockrent: number;
  coeflow: number;
  coefhigh: number;
  descr: string;
  descrfull: string;
  symbol: string;
  link: string;
  uuid: string;
  saledictionaryid: number;
  additional: number;
  commonincludes: number;
  usecommonincludes: number;
  checkactivehours: number;
  rentasservice: number;
  availablefl: string;
  availableul: string;
  organizationid: string;
  orgtarid: string;
  organizationname: string | null;
}

function isTarif(obj: any): obj is Tarif {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.tarid === 'number' &&
    typeof obj.actualtarid === 'number' &&
    typeof obj.shape === 'number' &&
    typeof obj.trafflimit === 'number' &&
    typeof obj.trafflimitper === 'number' &&
    typeof obj.type === 'number' &&
    typeof obj.actblock === 'number' &&
    typeof obj.archive === 'number' &&
    typeof obj.priceplan === 'number' &&
    typeof obj.trafftype === 'number' &&
    typeof obj.dailyrent === 'number' &&
    typeof obj.dynamicrent === 'number' &&
    typeof obj.shapeprior === 'number' &&
    typeof obj.unavaliable === 'number' &&
    typeof obj.rentmultiply === 'number' &&
    typeof obj.chargeincoming === 'number' &&
    typeof obj.curid === 'number' &&
    typeof obj.used === 'number' &&
    typeof obj.voipblocklocal === 'number' &&
    typeof obj.dynroute === 'number' &&
    typeof obj.servicetype === 'number' &&
    typeof obj.blockrentduration === 'string' &&
    typeof obj.rent === 'number' &&
    typeof obj.blockrent === 'number' &&
    typeof obj.usrblockrent === 'number' &&
    typeof obj.admblockrent === 'number' &&
    typeof obj.coeflow === 'number' &&
    typeof obj.coefhigh === 'number' &&
    typeof obj.descr === 'string' &&
    typeof obj.descrfull === 'string' &&
    typeof obj.symbol === 'string' &&
    typeof obj.link === 'string' &&
    typeof obj.uuid === 'string' &&
    typeof obj.saledictionaryid === 'number' &&
    typeof obj.additional === 'number' &&
    typeof obj.commonincludes === 'number' &&
    typeof obj.usecommonincludes === 'number' &&
    typeof obj.checkactivehours === 'number' &&
    typeof obj.rentasservice === 'number' &&
    typeof obj.availablefl === 'string' &&
    typeof obj.availableul === 'string' &&
    typeof obj.organizationid === 'string' &&
    typeof obj.orgtarid === 'string' &&
    (typeof obj.organizationname === 'string' || obj.organizationname === null)
  );
}

type TariffsSettingsRentAsService = {
  includeabove: number;
  rentperiod: number;
  rentperiodmonth: number;
  beginperiod: number;
  rent: string;
  blockrent: string;
  usrblockrent: string;
  admblockrent: string;
}

function isTariffsSettingsRentAsService(obj: any): obj is TariffsSettingsRentAsService {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.includeabove === 'number' &&
    typeof obj.rentperiod === 'number' &&
    typeof obj.rentperiodmonth === 'number' &&
    typeof obj.beginperiod === 'number' &&
    typeof obj.rent === 'string' &&
    typeof obj.blockrent === 'string' &&
    typeof obj.usrblockrent === 'string' &&
    typeof obj.admblockrent === 'string'
  );
}

export type GetTarifResponse = {
  tarif: Tarif;
  settingsrentasservice: TariffsSettingsRentAsService;
}

export const isGetTarifResponse = function(obj: any): obj is GetTarifResponse {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'tarif' in obj &&
    'settingsrentasservice' in obj &&
    isTarif(obj['tarif']) &&
    isTariffsSettingsRentAsService(obj['settingsrentasservice']) 
  );
}