import { NextFunction, Request, Response } from "express";
import { userService } from "../services";
import { UserGetRequestDto } from "../interfaces/dto/user.dto";

const getStocks = async (
  req: Request<UserGetRequestDto>,
  res: Response,
  next: NextFunction
) => {
  try {
    const stocks = await userService.getStocks(req.params.userId);
    return res.json(stocks);
  } catch (e) {
    return next(e);
  }
};

export default {
  getStocks,
};
