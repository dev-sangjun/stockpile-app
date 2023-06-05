import { NextFunction, Request, Response } from "express";
import { investmentService, userService } from "../services";
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

const getInvestments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  try {
    if (userId) {
      const investments = await investmentService.getInvestmentsByUserId(
        userId
      );
      return res.json(investments);
    }
  } catch (e) {
    return next(e);
  }
};

export default {
  getStocks,
  getInvestments,
};
