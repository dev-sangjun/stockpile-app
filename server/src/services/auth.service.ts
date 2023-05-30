import {
  AuthUserDto,
  AuthUserResponseDto,
} from "../interfaces/dto/auth-user.dto";
import DBClient from "../../prisma/DBClient";
import bcrypt from "bcryptjs";

const createUser = async (
  authUserDto: AuthUserDto
): Promise<AuthUserResponseDto> => {
  const { email, username, password } = authUserDto;
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

export default {
  createUser,
};
