import { Investment, Portfolio } from "@prisma/client";
import DBClient from "../../prisma/DBClient";
import {
  DuplicateEntityError,
  InternalServerError,
} from "../global/errors.global";
import {
  CreatePortfolioDto,
  AddInvestmentToPortfolioDto,
} from "../interfaces/dto/portfolio.dto";
import stockService from "./stock.service";
import userService from "./user.service";

const getAvgCost = (
  prevInvestment: Investment,
  newCost: number,
  newQuantity: number
): number => {
  const prevInvestmentTotalPrice =
    prevInvestment.avgCost * prevInvestment.quantity;
  const newInvestmentTotalPrice = newCost * newQuantity;
  const totalQuantity = prevInvestment.quantity + newQuantity;
  return (prevInvestmentTotalPrice + newInvestmentTotalPrice) / totalQuantity;
};

const getPortfoliosByUserId = async (userId: string): Promise<Portfolio[]> => {
  const portfolios = await DBClient.portfolio.findMany({
    where: {
      userId,
    },
    include: {
      investments: true,
    },
  });
  return portfolios;
};

const createPortfolio = async (
  createPortfolioDto: CreatePortfolioDto
): Promise<Portfolio> => {
  const { userId, name } = createPortfolioDto;
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

const addInvestmentToPortfolio = async (
  portfolioId: string,
  addInvestmentToPortfolioDto: AddInvestmentToPortfolioDto
): Promise<Investment> => {
  const { quantity, cost, userId, stockId } = addInvestmentToPortfolioDto;
  // invoke getStock to check if the stockId is valid
  const stock = await stockService.getStock({ q: stockId });
  // set cost to current price if nullish cost was passed
  const adjustedCost = cost ?? stock.c;
  await userService.addStock(userId, stock);
  // find investment
  const investment = await DBClient.investment.findFirst({
    where: {
      userId,
      portfolioId,
      stockId: stockId.toUpperCase(),
    },
  });
  if (!investment) {
    const newInvestment = await DBClient.investment.create({
      data: {
        quantity,
        avgCost: adjustedCost,
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
      avgCost: getAvgCost(investment, adjustedCost, quantity),
    },
    where: {
      id: investment.id,
    },
  });
  return updatedInvestment;
};

const deleteInvestment = async (investmentId: string): Promise<void> => {
  const investment = await DBClient.investment.delete({
    where: {
      id: investmentId,
    },
  });
  if (!investment) {
    throw new InternalServerError();
  }
};

export default {
  getPortfoliosByUserId,
  createPortfolio,
  addInvestmentToPortfolio,
  deleteInvestment,
};
