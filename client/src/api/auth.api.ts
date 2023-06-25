import axios, { AxiosResponse } from "axios";
import { User } from "../global/entity.interfaces";
import { PrismaError } from "../global/error.interfaces";
import { SERVER_ENDPOINT } from "./constants";
import { OperationResponseDto } from "./interfaces";

export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
}

const createUser = async (
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

const signIn = async (signInUserDto: SignInUserDto): Promise<string> => {
  const res: AxiosResponse<{ userId: string }> = await axios.post(
    `${SERVER_ENDPOINT}/auth/signin`,
    signInUserDto,
    { withCredentials: true }
  );
  // returns userId on successful sign in
  const { userId } = res.data;
  return userId;
};

const signOut = async (): Promise<OperationResponseDto> => {
  const res: AxiosResponse<OperationResponseDto> = await axios.get(
    `${SERVER_ENDPOINT}/auth/signout`,
    {
      withCredentials: true,
    }
  );
  // returns success (boolean) & message (string)
  return res.data;
};

const authAPI = {
  createUser,
  signIn,
  signOut,
};

export default authAPI;
