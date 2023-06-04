import { Investment } from "@prisma/client";
import DBClient from "../../prisma/DBClient";

const getInvestmentsByUserId = async (
  userId: string
): Promise<Investment[]> => {
  const investments = await DBClient.investment.findMany({
    where: {
      userId,
    },
  });
  return investments;
};

const getInvestmentsByPortfolioId = async (
  portfolioId: string
): Promise<Investment[]> => {
  const investments = await DBClient.investment.findMany({
    where: {
      portfolioId,
    },
  });
  return investments;
};

export default {
  getInvestmentsByUserId,
  getInvestmentsByPortfolioId,
};
