import { DEV_SERVER_ENDPOINT, TEST_USER_ID } from "../dev/constants";
import { Investment, Portfolio, Stock } from "../types/entity.types";
import { useFetch } from "../hooks";
import { useEffect, useState } from "react";
import { Stocks } from "../states/stocks.reducer";
import axios, { AxiosResponse } from "axios";

export const useFetchPortfolios = (
  userId: string = TEST_USER_ID
): [Portfolio[], Error | undefined, boolean] => {
  const [data, error, loading] = useFetch<Portfolio[]>(
    `${DEV_SERVER_ENDPOINT}/portfolios?userId=${userId}`,
    []
  );
  return [data || [], error, loading];
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

export const useFetchStockSymbols = (): [
  string[],
  Error | undefined,
  boolean
] => {
  const [data, error, loading] = useFetch<string[]>(
    `${DEV_SERVER_ENDPOINT}/stocks/symbols`,
    []
  );
  return [data || [], error, loading];
};

interface AddInvestmentRequestDto {
  quantity: number;
  cost: number;
  userId: string;
  stockId: string;
}
export const addInvestment = async (
  addInvestmentRequestDto: AddInvestmentRequestDto & { portfolioId: string }
): Promise<Investment> => {
  const { quantity, cost, userId, stockId, portfolioId } =
    addInvestmentRequestDto;
  const body: AddInvestmentRequestDto = {
    quantity,
    cost,
    userId,
    stockId,
  };
  const res: AxiosResponse<Investment> = await axios.post(
    `${DEV_SERVER_ENDPOINT}/portfolios/${portfolioId}/investments`,
    body
  );
  return res.data;
};
