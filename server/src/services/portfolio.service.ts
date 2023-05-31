import { Portfolio } from "@prisma/client";
import DBClient from "../../prisma/DBClient";
import { DuplicateEntityError } from "../global/errors.global";
import {
  PortfolioCreateDto,
  PortfolioGetRequestDto,
} from "../interfaces/dto/portfolio.dto";

const getPortfolios = async (
  portfolioGetRequestDto: PortfolioGetRequestDto
): Promise<Portfolio[]> => {
  const { userId } = portfolioGetRequestDto;
  const portfolios = await DBClient.portfolio.findMany({
    where: {
      userId,
    },
  });
  return portfolios;
};

const createPortfolio = async (
  portfolioCreateDto: PortfolioCreateDto
): Promise<Portfolio> => {
  const { userId, name } = portfolioCreateDto;
  const portfolio = await DBClient.portfolio.findFirst({
    where: {
      userId,
      name,
    },
  });
  if (portfolio) {
    throw new DuplicateEntityError();
  }
  const newPortfolio = await DBClient.portfolio.create({
    data: {
      userId,
      name,
    },
  });
  return newPortfolio;
};

export default {
  getPortfolios,
  createPortfolio,
};
