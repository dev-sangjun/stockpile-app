import axios, { AxiosResponse } from "axios";
import {
  DeleteInvestmentFromPortfolioDto,
  OperationResponseDto,
} from "./interfaces";
import { SERVER_ENDPOINT } from "./constants";

const deleteInvestmentFromPortfolio = async (
  deleteInvestmentFromPortfolioDto: DeleteInvestmentFromPortfolioDto
): Promise<OperationResponseDto> => {
  const { portfolioId, investmentId } = deleteInvestmentFromPortfolioDto;
  const res: AxiosResponse<OperationResponseDto> = await axios.delete(
    `${SERVER_ENDPOINT}/portfolios/${portfolioId}/investments/${investmentId}`,
    { withCredentials: true }
  );
  return res.data;
};

const investmentAPI = {
  deleteInvestmentFromPortfolio,
};

export default investmentAPI;
