import axios, { AxiosResponse } from "axios";
import { Investment, User } from "../types/entity.types";
import { SERVER_ENDPOINT } from "./constants";

const fetchInvestments = async (): Promise<Investment[]> => {
  const res: AxiosResponse<Investment[]> = await axios.get(
    `${SERVER_ENDPOINT}/me/investments`
  );
  return res.data;
};

const fetchUser = async (): Promise<User> => {
  const res: AxiosResponse<User> = await axios.get(`${SERVER_ENDPOINT}/me`, {
    withCredentials: true,
  });
  return res.data;
};

const handleFavorites = async (
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
      `${SERVER_ENDPOINT}/me/favorites`,
      body,
      { withCredentials: true }
    );
    return res.data;
  }
  const query = `${
    entityType === "Portfolio" ? "portfolioId" : "stockId"
  }=${entityId}`;
  const res: AxiosResponse<string[]> = await axios.delete(
    `${SERVER_ENDPOINT}/me/favorites?${query}`,
    { withCredentials: true }
  );
  return res.data;
};

const addToFavoriteStocks = async (stockId: string): Promise<string[]> => {
  return handleFavorites(stockId, "Stock", "ADD");
};

const deleteFromFavoriteStocks = async (stockId: string): Promise<string[]> => {
  return handleFavorites(stockId, "Stock", "DELETE");
};

const updateUser = async (
  field: "password" | "goal-amount",
  value: string | number
): Promise<{
  success: boolean;
  message?: string;
}> => {
  const body = {
    [field]: value,
  };
  const res: AxiosResponse<{ success: boolean; message?: string }> =
    await axios.patch(`${SERVER_ENDPOINT}/me?field=${field}`, body, {
      withCredentials: true,
    });
  return res.data;
};

const updatePassword = async (
  password: string
): Promise<{
  success: boolean;
  message?: string;
}> => {
  return updateUser("password", password);
};

const updateGoalAmount = async (
  goalAmount: number
): Promise<{
  success: boolean;
  message?: string;
}> => {
  return updateUser("goal-amount", goalAmount);
};

const deleteUser = async (): Promise<{
  success: boolean;
  message?: string;
}> => {
  const res: AxiosResponse<{ success: boolean; message?: string }> =
    await axios.delete(`${SERVER_ENDPOINT}/me`, {
      withCredentials: true,
    });
  return res.data;
};

export default {
  fetchInvestments,
  fetchUser,
  addToFavoriteStocks,
  deleteFromFavoriteStocks,
  updatePassword,
  updateGoalAmount,
  deleteUser,
};
