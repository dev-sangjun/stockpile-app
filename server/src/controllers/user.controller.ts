import { NextFunction, Request, Response } from "express";
import { investmentService, userService } from "../services";
import { BadRequestError } from "../global/errors.global";
import { AuthorizedRequest } from "../middlewares/auth.middleware";

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorizedUserId } = req as AuthorizedRequest;
    const user = await userService.getPublicUser(authorizedUserId);
    return res.json(user);
  } catch (e) {
    return next(e);
  }
};

const getStocks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorizedUserId } = req as AuthorizedRequest;
    const stocks = await userService.getStocks(authorizedUserId);
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
  const { authorizedUserId } = req as AuthorizedRequest;
  try {
    const investments = await investmentService.getInvestmentsByUserId(
      authorizedUserId
    );
    return res.json(investments);
  } catch (e) {
    return next(e);
  }
};

const addToFavorites = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorizedUserId } = req as AuthorizedRequest;
  const { stockId } = req.body;
  try {
    if (stockId) {
      const result = await userService.addToFavoriteStocks(
        authorizedUserId,
        stockId
      );
      return res.json(result);
    }
    throw new BadRequestError();
  } catch (e) {
    return next(e);
  }
};

const deleteFromFavorites = async (
  req: Request<undefined, any, any, { portfolioId?: string; stockId?: string }>,
  res: Response,
  next: NextFunction
) => {
  const { authorizedUserId } = req as AuthorizedRequest<
    undefined,
    any,
    any,
    { stockId?: string }
  >;
  const { stockId } = req.query;
  try {
    if (stockId) {
      const result = await userService.deleteFromFavoriteStocks(
        authorizedUserId,
        stockId
      );
      return res.json(result);
    }
    throw new BadRequestError();
  } catch (e) {
    return next(e);
  }
};

const updatePassword = async (
  req: Request<undefined, any, any, { field: string }>,
  res: Response,
  next: NextFunction
) => {
  const { authorizedUserId } = req as AuthorizedRequest<
    undefined,
    any,
    any,
    { field: string }
  >;
  const { field } = req.query;
  const { password } = req.body;
  const goalAmount = req.body["goal-amount"];
  try {
    if (field === "password" && password) {
      const result = await userService.updatePassword(
        authorizedUserId,
        password
      );
      return res.json(result);
    }
    if (field === "goal-amount" && goalAmount) {
      const result = await userService.updateGoalAmount(
        authorizedUserId,
        goalAmount
      );
      return res.json(result);
    }
    throw new BadRequestError();
  } catch (e) {
    return next(e);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const { authorizedUserId } = req as AuthorizedRequest;
  try {
    const result = await userService.deleteUser(authorizedUserId);
    return res.json(result);
  } catch (e) {
    return next(e);
  }
};

export default {
  getUser,
  getStocks,
  getInvestments,
  addToFavorites,
  deleteFromFavorites,
  updatePassword,
  deleteUser,
};
