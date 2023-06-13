import { NextFunction, Request, Response } from "express";
import {
  AuthUserSignInRequestDto,
  AuthUserSignUpRequestDto,
} from "../interfaces/dto/auth-user.dto";
import { authService } from "../services";

const signUpUser = async (req: Request, res: Response, next: NextFunction) => {
  const authUserSignUpRequestDto: AuthUserSignUpRequestDto = req.body;
  try {
    const authUserResponseDto = await authService.createUser(
      authUserSignUpRequestDto
    );
    return res.json(authUserResponseDto);
  } catch (e) {
    return next(e);
  }
};

const signInUser = async (req: Request, res: Response, next: NextFunction) => {
  const authUserSignInRequestDto: AuthUserSignInRequestDto = req.body;
  try {
    const { accessToken, userId } = await authService.signInUser(
      authUserSignInRequestDto
    );
    return res
      .cookie("access_token", accessToken, {
        httpOnly: true,
        path: "https://stockpile-app.herokuapp.com/api/",
      })
      .json({ userId });
  } catch (e) {
    return next(e);
  }
};

const signOutUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.clearCookie("access_token").sendStatus(200);
  } catch (e) {
    return next(e);
  }
};

export default { signUpUser, signInUser, signOutUser };
