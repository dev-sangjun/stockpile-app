import { NextFunction, Request, Response } from "express";
import {
  AuthUserSignInDto,
  AuthUserSignUpDto,
} from "../interfaces/dto/auth-user.dto";
import { authService } from "../services";

const signUpUser = async (req: Request, res: Response, next: NextFunction) => {
  const authUserSignUpDto: AuthUserSignUpDto = req.body;
  try {
    const authUserResponseDto = await authService.createUser(authUserSignUpDto);
    return res.json(authUserResponseDto);
  } catch (e) {
    return next(e);
  }
};

const signInUser = async (req: Request, res: Response, next: NextFunction) => {
  const authUserSignInDto: AuthUserSignInDto = req.body;
  try {
    const accessTokenResponseDto = await authService.signInUser(
      authUserSignInDto
    );
    return res.json(accessTokenResponseDto);
  } catch (e) {
    return next(e);
  }
};

export default { signUpUser, signInUser };
