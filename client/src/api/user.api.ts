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

const handleFavorites = async (
  userId: string,
  entityId: string,
  entityType: "Portfolio" | "Stock",
  actionType: "ADD" | "DELETE"
): Promise<string[]> => {
  if (actionType === "ADD") {
    const body =
      entityType === "Portfolio"
        ? {
            portfolioId: entityId,
          }
        : {
            stockId: entityId,
          };
    const res: AxiosResponse<string[]> = await axios.post(
      `${DEV_SERVER_ENDPOINT}/users/${userId}/favorites`,
      body
    );
    return res.data;
  }
  const query = `${
    entityType === "Portfolio" ? "portfolioId" : "stockId"
  }=${entityId}`;
  const res: AxiosResponse<string[]> = await axios.delete(
    `${DEV_SERVER_ENDPOINT}/users/${userId}/favorites?${query}`
  );
  return res.data;
};

export const addToFavoriteStocks = async (
  userId: string,
  stockId: string
): Promise<string[]> => {
  return handleFavorites(userId, stockId, "Stock", "ADD");
};

export const deleteFromFavoriteStocks = async (
  userId: string,
  stockId: string
): Promise<string[]> => {
  return handleFavorites(userId, stockId, "Stock", "DELETE");
};
