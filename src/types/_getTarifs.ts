export type TarifItem = {
  id: number;
  name: string;
  data: number;
  organizationid: string; // Organization ID as a string
  idwithinorg: string; // ID within organization as a string
};

export const isTarifItem = function (obj: any): obj is TarifItem {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.id === "number" &&
    typeof obj.name === "string" &&
    typeof obj.data === "number" &&
    typeof obj.organizationid === "string" &&
    typeof obj.idwithinorg === "string"
  );
};
