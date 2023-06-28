import axios, { AxiosResponse } from "axios";
import { User } from "../global/entity.interfaces";
import { SERVER_ENDPOINT } from "./constants";

const fetchUser = async (): Promise<User> => {
  const res: AxiosResponse<User> = await axios.get(`${SERVER_ENDPOINT}/me`, {
    withCredentials: true,
  });
  return res.data;
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

const userAPI = {
  fetchUser,
  updatePassword,
  updateGoalAmount,
  deleteUser,
};

export default userAPI;
