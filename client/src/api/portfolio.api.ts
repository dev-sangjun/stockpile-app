import axios, { AxiosResponse } from "axios";
import { Investment, Portfolio } from "../types/entity.types";
import { SERVER_ENDPOINT } from "./constants";

export const fetchPortfolios = async (): Promise<Portfolio[]> => {
  const res = await axios.get(`${SERVER_ENDPOINT}/portfolios`);
  return res.data;
};

export const addPortfolio = async (addPortfolioRequestDto: {
  name: string;
}): Promise<Portfolio> => {
  const res: AxiosResponse<Portfolio> = await axios.post(
    `${SERVER_ENDPOINT}/portfolios`,
    addPortfolioRequestDto,
    { withCredentials: true }
  );
  return res.data;
};

/**
 * Investment ops
 */

export interface AddInvestmentToPortfolioDto {
  quantity: number;
  cost: number | undefined;
  stockId: string;
}

export const addInvestmentToPortfolio = async (
  addInvestmentToPortfolioDto: AddInvestmentToPortfolioDto & {
    portfolioId: string;
  }
): Promise<Investment> => {
  const { quantity, cost, stockId, portfolioId } = addInvestmentToPortfolioDto;
  const body: AddInvestmentToPortfolioDto = {
    quantity,
    cost,
    stockId,
  };
  const res: AxiosResponse<Investment> = await axios.post(
    `${SERVER_ENDPOINT}/portfolios/${portfolioId}/investments`,
    body,
    { withCredentials: true }
  );
  return res.data;
};

export interface DeleteInvestmentFromPortfolioDto {
  portfolioId: string;
  investmentId: string;
}

export const deleteInvestmentFromPortfolio = async (
  deleteInvestmentFromPortfolioDto: DeleteInvestmentFromPortfolioDto
): Promise<Investment> => {
  const { portfolioId, investmentId } = deleteInvestmentFromPortfolioDto;
  const res: AxiosResponse<Investment> = await axios.delete(
    `${SERVER_ENDPOINT}/portfolios/${portfolioId}/investments/${investmentId}`,
    { withCredentials: true }
  );
  return res.data;
};

export const deletePortfolio = async (
  portfolioId: string
): Promise<Portfolio> => {
  const res: AxiosResponse<Portfolio> = await axios.delete(
    `${SERVER_ENDPOINT}/portfolios/${portfolioId}`,
    { withCredentials: true }
  );
  return res.data;
};
