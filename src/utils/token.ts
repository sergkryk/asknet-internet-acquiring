import { BankRequest } from "../controllers/tbank";
import { BankRequestCandidate } from "../services/tpayments/tpayments";

const crypto = require("crypto");

export type Operators = 4016 | 3743;
function isAmongOperators(data: any): data is Operators {
  return data === 4016 || data === 3743
}

interface Terminals {
  [key: string]: TerminalCredentials
}
interface TerminalCredentials {
  terminalKey: string
  terminalPass: string
}
// use assertion here because middleware checks all vars to be in the app
const terminals: Terminals = {
  asknet: {
    terminalKey: process.env.ASKNET_TERMINAL_KEY!,
    terminalPass: process.env.ASKNET_TERMINAL_PASS!
  },
  multinet: {
    terminalKey: process.env.MULTINET_TERMINAL_KEY!,
    terminalPass: process.env.MULTINET_TERMINAL_PASS!
  }
}

function getTerminal(operid: Operators): TerminalCredentials {
  switch (operid) {
    case 4016:
      return terminals.asknet
    case 3743:
      return terminals.multinet
  }
}
function getOperId(TerminalKey: string): Operators {
  switch (TerminalKey) {
    case terminals.asknet.terminalKey:
      return 4016
    case terminals.multinet.terminalKey:
      return 3743
    default:
      throw new Error("Failed to recognize terminal key")
  }
}

function insertBankRequiredFields(request: BankRequestCandidate): Omit<BankRequestCandidate, 'OperId'> & { TerminalKey: string, Password: string } {
  if ('OperId' in request && isAmongOperators(request.OperId)) {
    const { OperId, ...rest } = request
    const { terminalKey, terminalPass } = getTerminal(OperId)
    return { ...rest, TerminalKey: terminalKey, Password: terminalPass }
  } else {
    throw new Error('Failed to add bank required fields')
  }
}

export const getToken = function (data: BankRequestCandidate): Omit<BankRequestCandidate, 'OperId'> & {Token: string} {
  const dataWithBankRequiredFields = insertBankRequiredFields(data);
  const sortedKeys = Object.keys(dataWithBankRequiredFields).sort() as Array<keyof typeof dataWithBankRequiredFields>;
  const concatenatedValues = sortedKeys
    .map((key) => dataWithBankRequiredFields[key])
    .join("");
  const hash = crypto
    .createHash("sha256")
    .update(concatenatedValues, "utf8")
    .digest("hex");
  return { ...dataWithBankRequiredFields, Token: hash };
};

export const verifyRequestToken = function (request: BankRequest): boolean {
  const { Token, ...rest } = request;
  const { Token: verifiedToken } = getToken({ ...rest, OperId: getOperId(rest.TerminalKey) });
  return verifiedToken === Token;
};
