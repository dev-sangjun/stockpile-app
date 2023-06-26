import axios, { AxiosResponse } from "axios";
import { User } from "../global/entity.interfaces";
import { SERVER_ENDPOINT } from "./constants";
import { OperationResponseDto } from "./interfaces";

const fetchUser = async (): Promise<User> => {
  const res: AxiosResponse<User> = await axios.get(`${SERVER_ENDPOINT}/me`, {
    withCredentials: true,
  });
  return res.data;
};

const addToFavoriteStocks = async (stockId: string): Promise<string[]> => {
  const body = {
    stockId,
  };
  const res: AxiosResponse<string[]> = await axios.post(
    `${SERVER_ENDPOINT}/me/favorites`,
    body,
    { withCredentials: true }
  );
  return res.data;
};

const deleteFromFavoriteStocks = async (stockId: string): Promise<string[]> => {
  const query = `stockId=${stockId}`;
  const res: AxiosResponse<string[]> = await axios.delete(
    `${SERVER_ENDPOINT}/me/favorites?${query}`,
    { withCredentials: true }
  );
  return res.data;
};

const userAPI = {
  fetchUser,
  addToFavoriteStocks,
  deleteFromFavoriteStocks,
};

export default userAPI;
