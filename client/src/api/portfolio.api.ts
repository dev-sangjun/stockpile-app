import axios, { AxiosResponse } from "axios";
import { DEV_SERVER_ENDPOINT } from "../dev/constants";
import { Investment, Portfolio } from "../types/entity.types";

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

/**
 * Investment ops
 */

export interface AddInvestmentToPortfolioDto {
  quantity: number;
  cost: number | undefined;
  userId: string;
  stockId: string;
}

export interface DeleteInvestmentFromPortfolioDto {
  portfolioId: string;
  investmentId: string;
}

export const addInvestmentToPortfolio = async (
  addInvestmentToPortfolioDto: AddInvestmentToPortfolioDto & {
    portfolioId: string;
  }
): Promise<Investment> => {
  const { quantity, cost, userId, stockId, portfolioId } =
    addInvestmentToPortfolioDto;
  const body: AddInvestmentToPortfolioDto = {
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

export const deleteInvestmentFromPortfolio = async (
  deleteInvestmentFromPortfolioDto: DeleteInvestmentFromPortfolioDto
): Promise<Investment> => {
  const { portfolioId, investmentId } = deleteInvestmentFromPortfolioDto;
  const res: AxiosResponse<Investment> = await axios.delete(
    `${DEV_SERVER_ENDPOINT}/portfolios/${portfolioId}/investments/${investmentId}`
  );
  return res.data;
};

export const deletePortfolio = async (
  portfolioId: string
): Promise<Portfolio> => {
  const res: AxiosResponse<Portfolio> = await axios.delete(
    `${DEV_SERVER_ENDPOINT}/portfolios/${portfolioId}`
  );
  return res.data;
};
