import { NextFunction, Request, Response } from "express";
import {
  AuthUserSignInRequestDto,
  AuthUserSignUpRequestDto,
} from "../interfaces/dto/auth-user.dto";
import { authService } from "../services";
import { UnauthorizedError } from "../global/errors.global";
import { OperationResponseDto } from "../interfaces/dto/common.dto";

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
    const { accessToken, refreshToken, userId } = await authService.signInUser(
      authUserSignInRequestDto
    );
    return res
      .cookie("access_token", accessToken, {
        httpOnly: true,
        sameSite: true,
      })
      .cookie("refresh_token", refreshToken, {
        httpOnly: true,
        sameSite: true,
      })
      .json({ userId });
  } catch (e) {
    return next(e);
  }
};

const signOutUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const paylaod: OperationResponseDto = {
      success: true,
    };
    return res
      .clearCookie("access_token")
      .clearCookie("refresh_token")
      .json(paylaod);
  } catch (e) {
    return next(e);
  }
};

const regenerateAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) {
      throw new UnauthorizedError();
    }
    const newAccessToken = authService.regenerateAccessToken(refreshToken);
    return res
      .cookie("access_token", newAccessToken, {
        httpOnly: true,
        sameSite: true,
      })
      .json({
        success: true,
      });
  } catch (e) {
    return next(e);
  }
};

export default { signUpUser, signInUser, signOutUser, regenerateAccessToken };
