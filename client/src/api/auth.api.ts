import axios, { AxiosResponse } from "axios";
import { User } from "../types/entity.types";
import { DEV_SERVER_ENDPOINT } from "../dev/constants";

export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
}
export const createUser = async (
  createUserDto: CreateUserDto
): Promise<User> => {
  const res: AxiosResponse<User> = await axios.post(
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
