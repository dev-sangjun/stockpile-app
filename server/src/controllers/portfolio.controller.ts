import { NextFunction, Request, Response } from "express";
import { portfolioService } from "../services";
import {
  AddInvestmentToPortfolioDto,
  UpdatePortfolioDto,
} from "../interfaces/dto/portfolio.dto";
import { AuthorizedRequest } from "../middlewares/auth.middleware";

const getPortfolios = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorizedUserId } = req as AuthorizedRequest;
  try {
    const portfolios = await portfolioService.getPortfoliosByUserId(
      authorizedUserId
    );
    return res.json(portfolios);
  } catch (e) {
    return next(e);
  }
};

const createPortfolio = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorizedUserId } = req as AuthorizedRequest;
  const { name } = req.body;
  try {
    const portfolio = await portfolioService.createPortfolio(
      authorizedUserId,
      name
    );
    return res.json(portfolio);
  } catch (e) {
    return next(e);
  }
};

const addInvestmentToPortfolio = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorizedUserId } = req as AuthorizedRequest;
  const { portfolioId } = req.params;
  const addInvestmentToPortfolioDto: AddInvestmentToPortfolioDto = req.body;
  try {
    const portfolio = await portfolioService.addInvestmentToPortfolio(
      authorizedUserId,
      portfolioId,
      addInvestmentToPortfolioDto
    );
    return res.json(portfolio);
  } catch (e) {
    return next(e);
  }
};

const deleteInvestment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { investmentId } = req.params;
  try {
    const investment = await portfolioService.deleteInvestment(investmentId);
    return res.json(investment);
  } catch (e) {
    return next(e);
  }
};

const deletePortfolio = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { portfolioId } = req.params;
  try {
    const result = await portfolioService.deletePortfolio(portfolioId);
    return res.json(result);
  } catch (e) {
    return next(e);
  }
};

const updatePortfolio = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { portfolioId } = req.params;
  const { name } = req.body as UpdatePortfolioDto;
  try {
    const result = await portfolioService.updatePortfolio(portfolioId, name);
    return res.json(result);
  } catch (e) {
    return next(e);
  }
};

export default {
  getPortfolios,
  createPortfolio,
  addInvestmentToPortfolio,
  deleteInvestment,
  deletePortfolio,
  updatePortfolio,
};
