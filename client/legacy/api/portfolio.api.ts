import axios, { AxiosResponse } from "axios";
import { Investment, Portfolio } from "../types/entity.types";
import { SERVER_ENDPOINT } from "./constants";
import {
  AddInvestmentToPortfolioDto,
  DeleteInvestmentFromPortfolioDto,
  OperationResponseDto,
} from "./common.dto";

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

export const deleteInvestmentFromPortfolio = async (
  deleteInvestmentFromPortfolioDto: DeleteInvestmentFromPortfolioDto
): Promise<OperationResponseDto> => {
  const { portfolioId, investmentId } = deleteInvestmentFromPortfolioDto;
  const res: AxiosResponse<OperationResponseDto> = await axios.delete(
    `${SERVER_ENDPOINT}/portfolios/${portfolioId}/investments/${investmentId}`,
    { withCredentials: true }
  );
  return res.data;
};

export const deletePortfolio = async (
  portfolioId: string
): Promise<OperationResponseDto> => {
  const res: AxiosResponse<OperationResponseDto> = await axios.delete(
    `${SERVER_ENDPOINT}/portfolios/${portfolioId}`,
    { withCredentials: true }
  );
  return res.data;
};

export const updatePortfolio = async (
  portfolioId: string,
  name: string
): Promise<OperationResponseDto> => {
  const res: AxiosResponse<OperationResponseDto> = await axios.patch(
    `${SERVER_ENDPOINT}/portfolios/${portfolioId}`,
    { name },
    { withCredentials: true }
  );
  return res.data;
};
