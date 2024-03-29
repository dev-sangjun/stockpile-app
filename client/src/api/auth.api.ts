import axios, { AxiosResponse } from "axios";
import { User } from "../global/entity.interfaces";
import { PrismaError } from "../global/error.interfaces";
import { SERVER_ENDPOINT } from "./constants";
import { OperationResponseDto } from "./interfaces";
import { SignInUserDto, SignUpUserDto } from "./interfaces";

const signIn = async (dto: SignInUserDto): Promise<string> => {
  const res: AxiosResponse<{ userId: string }> = await axios.post(
    `${SERVER_ENDPOINT}/auth/signin`,
    dto,
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

const signUp = async (dto: SignUpUserDto): Promise<User | PrismaError> => {
  const res: AxiosResponse<User | PrismaError> = await axios.post(
    `${SERVER_ENDPOINT}/auth/signup`,
    dto
  );
  return res.data;
};

const authAPI = {
  signIn,
  signOut,
  signUp,
};

export default authAPI;
