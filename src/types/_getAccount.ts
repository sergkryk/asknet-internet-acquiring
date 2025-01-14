export type GetAccountItem = {}

export const isGetAccountItem = function(obj: any): obj is GetAccountItem {
  return (
    typeof obj === 'object' &&
    obj !== null
  );
}