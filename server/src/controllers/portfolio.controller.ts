import { NextFunction, Request, Response } from "express";
import { portfolioService } from "../services";
import {
  PortfolioCreateDto,
  PortfolioGetRequestDto,
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
  req: Request<PortfolioCreateDto>,
  res: Response,
  next: NextFunction
) => {
  const portfolioCreateDto: PortfolioCreateDto = req.body;
  try {
    const portfolio = await portfolioService.createPortfolio(
      portfolioCreateDto
    );
    return res.json(portfolio);
  } catch (e) {
    return next(e);
  }
};

export default { getPortfolios, createPortfolio };
