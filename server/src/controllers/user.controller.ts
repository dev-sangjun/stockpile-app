import { NextFunction, Request, Response } from "express";
import { investmentService, userService } from "../services";
import { BadRequestError } from "../global/errors.global";

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
    const investments = await investmentService.getInvestmentsByUserId(userId);
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
  const { userId } = req.params;
  const { portfolioId, stockId } = req.body;
  try {
    if (portfolioId) {
      const favoritePortfolios = await userService.addToFavoritePortfolios(
        userId,
        portfolioId
      );
      return res.json(favoritePortfolios);
    }
    if (stockId) {
      const favoriteStocks = await userService.addToFavoriteStocks(
        userId,
        stockId
      );
      return res.json(favoriteStocks);
    }
    throw new BadRequestError();
  } catch (e) {
    return next(e);
  }
};

const deleteFromFavorites = async (
  req: Request<
    { userId: string },
    any,
    any,
    { portfolioId?: string; stockId?: string }
  >,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  const { portfolioId, stockId } = req.query;
  try {
    if (portfolioId) {
      const favoritePortfolios = await userService.deleteFromFavoritePortfolios(
        userId,
        portfolioId
      );
      return res.json(favoritePortfolios);
    }
    if (stockId) {
      const favoriteStocks = await userService.deleteFromFavoriteStocks(
        userId,
        stockId
      );
      return res.json(favoriteStocks);
    }
    throw new BadRequestError();
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
};
