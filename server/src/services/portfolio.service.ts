import { Investment, Portfolio } from "@prisma/client";
import DBClient from "../../prisma/DBClient";
import {
  DuplicateEntityError,
  InternalServerError,
} from "../global/errors.global";
import { AddInvestmentToPortfolioDto } from "../interfaces/dto/portfolio.dto";
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
  userId: string,
  portfolioName: string
): Promise<Portfolio> => {
  const portfolio = await DBClient.portfolio.findFirst({
    where: {
      userId,
      name: portfolioName,
    },
  });
  if (portfolio) {
    throw new DuplicateEntityError();
  }
  const newPortfolio = await DBClient.portfolio.create({
    data: {
      userId,
      name: portfolioName,
    },
  });
  return newPortfolio;
};

const addInvestmentToPortfolio = async (
  userId: string,
  portfolioId: string,
  addInvestmentToPortfolioDto: AddInvestmentToPortfolioDto
): Promise<Investment> => {
  const { quantity, cost, stockId } = addInvestmentToPortfolioDto;
  // invoke getStock to check if the stockId is valid
  const stock = await stockService.getStock(stockId);
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
  await userService.deleteStockWithNoReferenceFromUser(
    investment.userId,
    investment.stockId
  );
};

const deletePortfolio = async (portfolioId: string): Promise<void> => {
  const portfolio = await DBClient.portfolio.delete({
    where: {
      id: portfolioId,
    },
  });
  if (!portfolio) {
    throw new InternalServerError();
  }
};

export default {
  getPortfoliosByUserId,
  createPortfolio,
  addInvestmentToPortfolio,
  deleteInvestment,
  deletePortfolio,
};
