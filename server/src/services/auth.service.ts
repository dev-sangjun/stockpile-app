import { User } from "@prisma/client";
import { AuthUserDto } from "../dto/auth-user.dto";
import DBClient from "../../prisma/DBClient";

const createUser = async (authUserDto: AuthUserDto): Promise<User> => {
  const { email, username, password } = authUserDto;
  try {
    const user = await DBClient.user.create({
      data: {
        email,
        username,
        password,
      },
    });
    return user;
  } catch (e) {
    throw e;
  }
};

export default {
  createUser,
};
