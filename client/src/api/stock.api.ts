import axios, { AxiosResponse } from "axios";
import { SERVER_ENDPOINT } from "./constants";
import { OperationResponseDto } from "./interfaces";

const fetchStockSymbols = async (): Promise<string[]> => {
  const res: AxiosResponse<string[]> = await axios.get(
    `${SERVER_ENDPOINT}/stocks/symbols`,
    { withCredentials: true }
  );
  return res.data;
};

const addToFavoriteStocks = async (
  stockId: string
): Promise<OperationResponseDto> => {
  const body = {
    stockId,
  };
  const res: AxiosResponse<OperationResponseDto> = await axios.post(
    `${SERVER_ENDPOINT}/me/favorites`,
    body,
    { withCredentials: true }
  );
  return res.data;
};

const deleteFromFavoriteStocks = async (
  stockId: string
): Promise<OperationResponseDto> => {
  const query = `stockId=${stockId}`;
  const res: AxiosResponse<OperationResponseDto> = await axios.delete(
    `${SERVER_ENDPOINT}/me/favorites?${query}`,
    { withCredentials: true }
  );
  return res.data;
};

const stockAPI = {
  fetchStockSymbols,
  addToFavoriteStocks,
  deleteFromFavoriteStocks,
};

export default stockAPI;
