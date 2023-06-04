import axios, { AxiosResponse } from "axios";
import { DEV_SERVER_ENDPOINT } from "../dev/constants";
import { Stocks } from "../states/stocks.reducer";
import { Stock } from "../types/entity.types";

export const fetchStockSymbols = async (): Promise<string[]> => {
  const res: AxiosResponse<string[]> = await axios.get(
    `${DEV_SERVER_ENDPOINT}/stocks/symbols`
  );
  return res.data;
};

export const fetchStocksByUserId = async (userId: string): Promise<Stocks> => {
  const res: AxiosResponse<Stock[]> = await axios.get(
    `${DEV_SERVER_ENDPOINT}/users/${userId}/stocks`
  );
  const stocks: Stocks = {};
  res.data.forEach(stock => {
    stocks[stock.id] = stock;
  });
  return stocks;
};
