export interface StockGetRequestDto {
  q: string;
}

export interface StockGetSymbolsRequestDto {
  q: string;
  start?: string;
  num?: string;
}
