import { NextFunction, Request, Response } from "express";
import { portfolioService } from "../services";
import {
  InvestmentAddRequestDto,
  PortfolioCreateRequestDto,
  PortfolioGetRequestDto,
  PortfolioPostRequestDto,
} from "../interfaces/dto/portfolio.dto";

const getPortfolios = async (
  req: Request<undefined, any, any, PortfolioGetRequestDto>,
  res: Response,
  next: NextFunction
) => {
  const portfolioGetRequestDto: PortfolioGetRequestDto = req.query;
  try {
    const portfolios = await portfolioService.getPortfolios(
      portfolioGetRequestDto
    );
    return res.json(portfolios);
  } catch (e) {
    return next(e);
  }
};

const createPortfolio = async (
  req: Request<PortfolioCreateRequestDto>,
  res: Response,
  next: NextFunction
) => {
  const portfolioCreateDto: PortfolioCreateRequestDto = req.body;
  try {
    const portfolio = await portfolioService.createPortfolio(
      portfolioCreateDto
    );
    return res.json(portfolio);
  } catch (e) {
    return next(e);
  }
};

const getInvestments = async (
  req: Request<{ portfolioId: string }>,
  res: Response,
  next: NextFunction
) => {
  const { portfolioId } = req.params;
  try {
    const investments = await portfolioService.getInvestments(portfolioId);
    return res.json(investments);
  } catch (e) {
    return next(e);
  }
};

const addInvestment = async (
  req: Request<PortfolioPostRequestDto>,
  res: Response,
  next: NextFunction
) => {
  const { portfolioId } = req.params;
  const investmentAddRequestDto: InvestmentAddRequestDto = req.body;
  try {
    const portfolio = await portfolioService.addInvestment(
      portfolioId,
      investmentAddRequestDto
    );
    return res.json(portfolio);
  } catch (e) {
    return next(e);
  }
};

export default {
  getPortfolios,
  createPortfolio,
  getInvestments,
  addInvestment,
};
