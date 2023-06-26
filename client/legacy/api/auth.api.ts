import axios, { AxiosResponse } from "axios";
import { User } from "../types/entity.types";
import { PrismaError } from "../utils/error.utils";
import { SERVER_ENDPOINT } from "./constants";
import { OperationResponseDto } from "./common.dto";

axios.interceptors.response.use(
  res => res,
  async err => {
    try {
      if (err.response.status === 401) {
        const originalRequest = err.config;
        originalRequest._retry = true;
        const res: AxiosResponse<OperationResponseDto> = await axios.get(
          `${SERVER_ENDPOINT}/auth/refresh`,
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          return axios(err.config);
        }
      }
      return Promise.reject(err);
    } catch (e) {
      console.error(e);
    }
  }
);

export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
}

export const createUser = async (
  createUserDto: CreateUserDto
): Promise<User | PrismaError> => {
  const res: AxiosResponse<User | PrismaError> = await axios.post(
    `${SERVER_ENDPOINT}/auth/signup`,
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
    `${SERVER_ENDPOINT}/auth/signin`,
    signInUserDto,
    { withCredentials: true }
  );
  // returns userId on successful sign in
  const { userId } = res.data;
  return userId;
};

export const signOutUser = async (): Promise<void> => {
  await axios.get(`${SERVER_ENDPOINT}/auth/signout`, {
    withCredentials: true,
  });
};

const authAPI = {};
