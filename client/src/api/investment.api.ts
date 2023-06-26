import axios, { AxiosResponse } from "axios";
import {
  AddInvestmentToPortfolioDto,
  DeleteInvestmentFromPortfolioDto,
  OperationResponseDto,
} from "./interfaces";
import { SERVER_ENDPOINT } from "./constants";
import { Investment } from "../global/entity.interfaces";

const addInvestmentToPortfolio = async (
  dto: AddInvestmentToPortfolioDto & {
    portfolioId: string;
  }
): Promise<Investment> => {
  const { quantity, cost, stockId, portfolioId } = dto;
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

const deleteInvestmentFromPortfolio = async (
  dto: DeleteInvestmentFromPortfolioDto
): Promise<OperationResponseDto> => {
  const { portfolioId, investmentId } = dto;
  const res: AxiosResponse<OperationResponseDto> = await axios.delete(
    `${SERVER_ENDPOINT}/portfolios/${portfolioId}/investments/${investmentId}`,
    { withCredentials: true }
  );
  return res.data;
};

const investmentAPI = {
  addInvestmentToPortfolio,
  deleteInvestmentFromPortfolio,
};

export default investmentAPI;
