import axios, { AxiosResponse } from "axios";
import { User } from "../global/entity.interfaces";
import { SERVER_ENDPOINT } from "./constants";

const fetchUser = async (): Promise<User> => {
  const res: AxiosResponse<User> = await axios.get(`${SERVER_ENDPOINT}/me`, {
    withCredentials: true,
  });
  return res.data;
};

const userAPI = {
  fetchUser,
};

export default userAPI;
