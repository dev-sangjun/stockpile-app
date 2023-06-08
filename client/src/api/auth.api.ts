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
