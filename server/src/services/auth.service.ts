import {
  AuthUserSignUpDto,
  AuthUserResponseDto,
  AuthUserSignInDto,
} from "../interfaces/dto/auth-user.dto";
import DBClient from "../../prisma/DBClient";
import bcrypt from "bcryptjs";
import { User } from "@prisma/client";
import {
  EntityNotFoundError,
  UnauthorizedError,
} from "../global/errors.global";

const createUser = async (
  authUserSignUpDto: AuthUserSignUpDto
): Promise<AuthUserResponseDto> => {
  const { email, username, password } = authUserSignUpDto;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const user = await DBClient.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });
    return {
      id: user.id,
    };
  } catch (e) {
    throw e;
  }
};

const signInUser = async (
  authUserSignInDto: AuthUserSignInDto
): Promise<AuthUserResponseDto> => {
  const { email, password } = authUserSignInDto;
  const user = await DBClient.user.findFirst({
    where: {
      email,
    },
  });
  if (!user) {
    throw new EntityNotFoundError();
  }
  // compare password
  if (!(await bcrypt.compare(password, user.password))) {
    throw new UnauthorizedError();
  }
  return {
    id: user.id,
  };
};

export default {
  createUser,
  signInUser,
};
