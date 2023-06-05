import { NextFunction, Request, Response } from "express";
import { portfolioService } from "../services";
import {
  CreatePortfolioDto,
  AddInvestmentToPortfolioDto,
} from "../interfaces/dto/portfolio.dto";

const getPortfolios = async (
  req: Request<undefined, any, any, { userId: string }>,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.query;
  try {
    const portfolios = await portfolioService.getPortfoliosByUserId(userId);
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
  const createPortfolioDto: CreatePortfolioDto = req.body;
  try {
    const portfolio = await portfolioService.createPortfolio(
      createPortfolioDto
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
  const { portfolioId } = req.params;
  const addInvestmentToPortfolioDto: AddInvestmentToPortfolioDto = req.body;
  try {
    const portfolio = await portfolioService.addInvestmentToPortfolio(
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
    const investment = await portfolioService.deletePortfolio(portfolioId);
    return res.json(investment);
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
};
