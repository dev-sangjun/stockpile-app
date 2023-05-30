export interface FinnhubStockResponseDto {
  c: number; // current
  d: number; // change
  dp: number; // percentage change
  h: number; // high
  l: number; // low
  pc: number; // previous close price
}

export type FinnhubCompanyResponseDto = {
  name: string;
  ipo: string;
  logo: string;
};
