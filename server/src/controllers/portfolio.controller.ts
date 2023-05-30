import { NextFunction, Request, Response } from "express";
import { portfolioService } from "../services";
import { PortfolioGetRequestDto } from "../interfaces/dto/portfolio.dto";

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

export default { getPortfolios };
