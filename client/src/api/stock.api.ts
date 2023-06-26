import axios, { AxiosResponse } from "axios";
import { SERVER_ENDPOINT } from "./constants";

const fetchStockSymbols = async (): Promise<string[]> => {
  const res: AxiosResponse<string[]> = await axios.get(
    `${SERVER_ENDPOINT}/stocks/symbols`,
    { withCredentials: true }
  );
  return res.data;
};

const stockAPI = {
  fetchStockSymbols,
};

export default stockAPI;
