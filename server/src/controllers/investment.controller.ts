import { NextFunction, Request, Response } from "express";
import { investmentService } from "../services";
import { BadRequestError } from "../global/errors.global";

const getInvestments = async (
  req: Request<undefined, any, any, { userId?: string; portfolioId?: string }>,
  res: Response,
  next: NextFunction
) => {
  const { userId, portfolioId } = req.query;
  try {
    if (userId) {
      const investments = await investmentService.getInvestmentsByUserId(
        userId
      );
      return res.json(investments);
    }
    if (portfolioId) {
      const investments = await investmentService.getInvestmentsByPortfolioId(
        portfolioId
      );
      return res.json(investments);
    }
    throw new BadRequestError();
  } catch (e) {
    return next(e);
  }
};

export default {
  getInvestments,
};
