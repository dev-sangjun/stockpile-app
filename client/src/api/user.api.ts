import axios, { AxiosResponse } from "axios";
import { DEV_SERVER_ENDPOINT } from "../dev/constants";
import { Investment, User } from "../types/entity.types";

export const fetchInvestments = async (
  userId: string
): Promise<Investment[]> => {
  const res: AxiosResponse<Investment[]> = await axios.get(
    `${DEV_SERVER_ENDPOINT}/users/${userId}/investments`
  );
  return res.data;
};

export const fetchUser = async (userId: string): Promise<User> => {
  const res: AxiosResponse<User> = await axios.get(
    `${DEV_SERVER_ENDPOINT}/users/${userId}`
  );
  return res.data;
};
