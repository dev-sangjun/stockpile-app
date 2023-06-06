import {
  AuthUserSignUpRequestDto,
  AuthUserResponseDto,
  AuthUserSignInRequestDto,
  AccessTokenResponseDto,
} from "../interfaces/dto/auth-user.dto";
import DBClient from "../../prisma/DBClient";
import bcrypt from "bcryptjs";
import {
  EntityNotFoundError,
  UnauthorizedError,
} from "../global/errors.global";
import jwt from "jsonwebtoken";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY!;

const createUser = async (
  authUserSignUpRequestDto: AuthUserSignUpRequestDto
): Promise<AuthUserResponseDto> => {
  const { email, username, password } = authUserSignUpRequestDto;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await DBClient.user.create({
    data: {
      email,
      username,
      password: hashedPassword,
      netWorths: [],
    },
  });
  return {
    id: user.id,
  };
};

const signInUser = async (
  authUserSignInRequestDto: AuthUserSignInRequestDto
): Promise<AccessTokenResponseDto> => {
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
      id: user.id,
    },
    JWT_SECRET_KEY
  );
  return {
    accessToken,
  };
};

export default {
  createUser,
  signInUser,
};
