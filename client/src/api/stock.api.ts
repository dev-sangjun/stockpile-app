import axios, { AxiosResponse } from "axios";
import { DEV_SERVER_ENDPOINT } from "../dev/constants";
import { Stock, Stocks } from "../types/entity.types";

export const fetchStockSymbols = async (): Promise<string[]> => {
  const res: AxiosResponse<string[]> = await axios.get(
    `${DEV_SERVER_ENDPOINT}/stocks/symbols`,
    { withCredentials: true }
  );
  return res.data;
};

export const fetchStocksByUserId = async (): Promise<Stocks> => {
  const res: AxiosResponse<Stock[]> = await axios.get(
    `${DEV_SERVER_ENDPOINT}/users/me/stocks`,
    { withCredentials: true }
  );
  const stocks: Stocks = {};
  res.data.forEach(stock => {
    stocks[stock.id] = stock;
  });
  return stocks;
};
