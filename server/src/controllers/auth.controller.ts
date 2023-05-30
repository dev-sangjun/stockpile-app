import { NextFunction, Request, Response } from "express";
import { AuthUserDto } from "../dto/auth-user.dto";
import { AuthService } from "../services";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const authUserDto: AuthUserDto = req.body;
  try {
    const user = await AuthService.createUser(authUserDto);
    return res.json(user);
  } catch (e) {
    return next(e);
  }
};

export default { createUser };
