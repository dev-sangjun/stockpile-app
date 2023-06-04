import { DEV_SERVER_ENDPOINT } from "../dev/constants";
import { Investment, Portfolio, Stock } from "../types/entity.types";
import { Stocks } from "../states/stocks.reducer";
import axios, { AxiosResponse } from "axios";

export const fetchStockSymbols = async () => {
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

export interface AddInvestmentRequestDto {
  quantity: number;
  cost: number | undefined;
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

export const fetchPortfoliosByUserId = async (
  userId: string
): Promise<Portfolio[]> => {
  const res = await axios.get(
    `${DEV_SERVER_ENDPOINT}/portfolios?userId=${userId}`
  );
  return res.data;
};

export interface AddPortfolioRequestDto {
  name: string;
  userId: string;
}

export const addPortfolio = async (
  addPortfolioRequestDto: AddPortfolioRequestDto
): Promise<Portfolio> => {
  const res: AxiosResponse<Portfolio> = await axios.post(
    `${DEV_SERVER_ENDPOINT}/portfolios`,
    addPortfolioRequestDto
  );
  return res.data;
};

export interface DeleteInvestmentRequestDto {
  portfolioId: string;
  investmentId: string;
}

export const deleteInvestment = async (
  deleteInvestmentRequestDto: DeleteInvestmentRequestDto
): Promise<Investment> => {
  const { portfolioId, investmentId } = deleteInvestmentRequestDto;
  const res: AxiosResponse<Investment> = await axios.delete(
    `${DEV_SERVER_ENDPOINT}/portfolios/${portfolioId}/investments/${investmentId}`
  );
  return res.data;
};
