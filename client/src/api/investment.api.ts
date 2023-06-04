import axios, { AxiosResponse } from "axios";
import { DEV_SERVER_ENDPOINT } from "../dev/constants";
import { Investment } from "../types/entity.types";

export const fetchInvestmentsByUserId = async (
  userId: string
): Promise<Investment[]> => {
  const res: AxiosResponse<Investment[]> = await axios.get(
    `${DEV_SERVER_ENDPOINT}/investments?userId=${userId}`
  );
  return res.data;
};
