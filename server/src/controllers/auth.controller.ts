import { NextFunction, Request, Response } from "express";
import { AuthUserDto } from "../interfaces/dto/auth-user.dto";
import { AuthService } from "../services";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const authUserDto: AuthUserDto = req.body;
  try {
    const authUserResponseDto = await AuthService.createUser(authUserDto);
    return res.json(authUserResponseDto);
  } catch (e) {
    return next(e);
  }
};

export default { createUser };
