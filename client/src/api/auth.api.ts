import axios, { AxiosResponse } from "axios";
import { User } from "../types/entity.types";
import { PrismaError } from "../utils/error.utils";
import { DEV_SERVER_ENDPOINT } from "./constants";

export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
}

export const createUser = async (
  createUserDto: CreateUserDto
): Promise<User | PrismaError> => {
  const res: AxiosResponse<User | PrismaError> = await axios.post(
    `${DEV_SERVER_ENDPOINT}/auth/signup`,
    createUserDto
  );
  return res.data;
};

export interface SignInUserDto {
  email: string;
  password: string;
}

export const signInUser = async (
  signInUserDto: SignInUserDto
): Promise<string> => {
  const res: AxiosResponse<{ userId: string }> = await axios.post(
    `${DEV_SERVER_ENDPOINT}/auth/signin`,
    signInUserDto,
    { withCredentials: true }
  );
  // returns userId on successful sign in
  const { userId } = res.data;
  return userId;
};

export const signOutUser = async (): Promise<void> => {
  await axios.get(`${DEV_SERVER_ENDPOINT}/auth/signout`, {
    withCredentials: true,
  });
};
