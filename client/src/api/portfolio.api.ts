import axios, { AxiosResponse } from "axios";
import { SERVER_ENDPOINT } from "./constants";
import { Portfolio } from "../global/entity.interfaces";
import { OperationResponseDto } from "./interfaces";

const addPortfolio = async (name: string): Promise<Portfolio> => {
  const body = {
    name,
  };
  const res: AxiosResponse<Portfolio> = await axios.post(
    `${SERVER_ENDPOINT}/portfolios`,
    body,
    { withCredentials: true }
  );
  return res.data;
};

const deletePortfolio = async (
  portfolioId: string
): Promise<OperationResponseDto> => {
  const res: AxiosResponse<OperationResponseDto> = await axios.delete(
    `${SERVER_ENDPOINT}/portfolios/${portfolioId}`,
    { withCredentials: true }
  );
  return res.data;
};

const updatePortfolio = async (
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

const portfolioAPI = {
  addPortfolio,
  deletePortfolio,
  updatePortfolio,
};

export default portfolioAPI;
