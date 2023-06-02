import { DEV_SERVER_ENDPOINT, TEST_USER_ID } from "../dev/constants";
import { Portfolio, Stock } from "../types/entity.types";
import { useFetch } from "../hooks";
import { useEffect, useState } from "react";
import { Stocks } from "../states/stocks.reducer";

export const useFetchPortfolios = (userId: string = TEST_USER_ID) => {
  return useFetch<Portfolio[]>(
    `${DEV_SERVER_ENDPOINT}/portfolios?userId=${userId}`,
    []
  );
};

export const useFetchUserStocks = (
  userId: string = TEST_USER_ID
): [Stocks, Error | undefined, boolean] => {
  const [stocks, error, loading] = useFetch<Stock[]>(
    `${DEV_SERVER_ENDPOINT}/users/${userId}/stocks`,
    []
  );
  const [formattedStocks, setFormattedStocks] = useState<Stocks>({});
  useEffect(() => {
    if (stocks) {
      // format into an obj with key == stock symbol, value == stock obj
      const newStocks: Stocks = {};
      stocks.forEach(stock => {
        newStocks[stock.id] = stock;
      });
      setFormattedStocks(newStocks);
    }
  }, [stocks]);
  return [formattedStocks, error, loading];
};

export const useFetchStockSymbols = () => {
  return useFetch<string[]>(`${DEV_SERVER_ENDPOINT}/stocks/symbols`, []);
};
