import {
  AuthUserSignUpRequestDto,
  AuthUserResponseDto,
  AuthUserSignInRequestDto,
} from "../interfaces/dto/auth-user.dto";
import DBClient from "../../prisma/DBClient";
import bcrypt from "bcryptjs";
import {
  EntityNotFoundError,
  UnauthorizedError,
} from "../global/errors.global";
import jwt from "jsonwebtoken";
import { Prisma } from "@prisma/client";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY!;

const createUser = async (
  authUserSignUpRequestDto: AuthUserSignUpRequestDto
): Promise<AuthUserResponseDto> => {
  const { email, username, password } = authUserSignUpRequestDto;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const user = await DBClient.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        favoritePortfolios: [],
        favoriteStocks: [],
      },
    });
    return {
      id: user.id,
    };
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === "P2002"
    ) {
      // Unique constraints error will only return the first violated unique field
      if (e.meta?.target && Array.isArray(e.meta?.target)) {
        // no need to check for username if the error is caused by username field
        if (e.meta.target.includes("username")) {
          throw e;
        }
        // check if username is already in use & add the field to e.meta.target
        const user = await DBClient.user.findFirst({
          where: {
            username,
          },
        });
        if (user) {
          e.meta.target.push("username");
        }
      }
    }
    throw e;
  }
};

const signInUser = async (
  authUserSignInRequestDto: AuthUserSignInRequestDto
): Promise<{
  accessToken: string;
  userId: string;
}> => {
  const { email, password } = authUserSignInRequestDto;
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
  // generate access token
  const accessToken = jwt.sign(
    {
      userId: user.id,
    },
    JWT_SECRET_KEY
  );
  return {
    accessToken,
    userId: user.id,
  };
};

export default {
  createUser,
  signInUser,
};
