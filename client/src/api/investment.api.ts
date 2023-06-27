import axios, { AxiosResponse } from "axios";
import {
  AddInvestmentToPortfolioDto,
  OperationResponseDto,
  UpdateInvestmentDto,
} from "./interfaces";
import { SERVER_ENDPOINT } from "./constants";
import { Investment } from "../global/entity.interfaces";

const addInvestmentToPortfolio = async (
  portfolioId: string,
  dto: AddInvestmentToPortfolioDto
): Promise<Investment> => {
  const res: AxiosResponse<Investment> = await axios.post(
    `${SERVER_ENDPOINT}/portfolios/${portfolioId}/investments`,
    dto,
    { withCredentials: true }
  );
  return res.data;
};

const updateInvestment = async (
  investmentId: string,
  dto: UpdateInvestmentDto
): Promise<OperationResponseDto> => {
  const res: AxiosResponse<OperationResponseDto> = await axios.patch(
    `${SERVER_ENDPOINT}/investments/${investmentId}`,
    dto,
    { withCredentials: true }
  );
  return res.data;
};

const deleteInvestmentFromPortfolio = async (
  portfolioId: string,
  investmentId: string
): Promise<OperationResponseDto> => {
  const res: AxiosResponse<OperationResponseDto> = await axios.delete(
    `${SERVER_ENDPOINT}/portfolios/${portfolioId}/investments/${investmentId}`,
    { withCredentials: true }
  );
  return res.data;
};

const investmentAPI = {
  addInvestmentToPortfolio,
  updateInvestment,
  deleteInvestmentFromPortfolio,
};

export default investmentAPI;
