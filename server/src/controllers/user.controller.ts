import { NextFunction, Request, Response } from "express";
import { investmentService, userService } from "../services";

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const user = await userService.getPublicUser(userId);
    return res.json(user);
  } catch (e) {
    return next(e);
  }
};

const getStocks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const stocks = await userService.getStocks(userId);
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
  getUser,
  getStocks,
  getInvestments,
};
