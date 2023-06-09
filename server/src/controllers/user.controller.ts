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
  const { portfolioId, stockId } = req.body;
  try {
    if (portfolioId) {
      const favoritePortfolios = await userService.addToFavoritePortfolios(
        authorizedUserId,
        portfolioId
      );
      return res.json(favoritePortfolios);
    }
    if (stockId) {
      const favoriteStocks = await userService.addToFavoriteStocks(
        authorizedUserId,
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
  req: Request<undefined, any, any, { portfolioId?: string; stockId?: string }>,
  res: Response,
  next: NextFunction
) => {
  const { authorizedUserId } = req as AuthorizedRequest<
    undefined,
    any,
    any,
    { portfolioId?: string; stockId?: string }
  >;
  const { portfolioId, stockId } = req.query;
  try {
    if (portfolioId) {
      const favoritePortfolios = await userService.deleteFromFavoritePortfolios(
        authorizedUserId,
        portfolioId
      );
      return res.json(favoritePortfolios);
    }
    if (stockId) {
      const favoriteStocks = await userService.deleteFromFavoriteStocks(
        authorizedUserId,
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
