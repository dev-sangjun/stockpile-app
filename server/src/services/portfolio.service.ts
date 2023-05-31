import { Investment, Portfolio } from "@prisma/client";
import DBClient from "../../prisma/DBClient";
import { DuplicateEntityError } from "../global/errors.global";
import {
  InvestmentAddRequestDto,
  PortfolioCreateRequestDto,
  PortfolioGetRequestDto,
} from "../interfaces/dto/portfolio.dto";
import stockService from "./stock.service";

const getAvgCost = (
  prevInvestment: Investment,
  newCost: number,
  newQuantity: number
) => {
  const prevInvestmentTotalPrice =
    prevInvestment.avgCost * prevInvestment.quantity;
  const newInvestmentTotalPrice = newCost * newQuantity;
  const totalQuantity = prevInvestment.quantity + newQuantity;
  return (prevInvestmentTotalPrice + newInvestmentTotalPrice) / totalQuantity;
};

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
  portfolioCreateDto: PortfolioCreateRequestDto
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

const getInvestments = async (portfolioId: string): Promise<Investment[]> => {
  const investments = await DBClient.investment.findMany({
    where: {
      portfolioId,
    },
  });
  return investments;
};

const addInvestment = async (
  portfolioId: string,
  investmentAddRequestDto: InvestmentAddRequestDto
): Promise<Investment> => {
  const { quantity, cost, userId, stockId } = investmentAddRequestDto;
  // invoke getStock to check if the stockId is valid
  await stockService.getStock({ q: stockId });

  // find investment
  const investment = await DBClient.investment.findFirst({
    where: {
      stockId: stockId.toUpperCase(),
    },
  });
  if (!investment) {
    const newInvestment = await DBClient.investment.create({
      data: {
        quantity,
        avgCost: cost,
        userId,
        portfolioId,
        stockId: stockId.toUpperCase(),
      },
    });
    return newInvestment;
  }
  const updatedInvestment = await DBClient.investment.update({
    data: {
      quantity: investment.quantity + quantity,
      avgCost: getAvgCost(investment, cost, quantity),
    },
    where: {
      id: investment.id,
    },
  });
  return updatedInvestment;
};

export default {
  getPortfolios,
  createPortfolio,
  getInvestments,
  addInvestment,
};
