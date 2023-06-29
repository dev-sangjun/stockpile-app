import { Investment } from "@prisma/client";
import DBClient from "../../prisma/DBClient";
import { InternalServerError } from "../global/errors.global";
import { UpdateInvestmentDto } from "../interfaces/dto/investment.dto";
import { OperationResponseDto } from "../interfaces/dto/common.dto";

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
    orderBy: {
      createdAt: "asc",
    },
  });
  return investments;
};

const updateInvestment = async (
  investmentId: string,
  updateInvestmentDto: UpdateInvestmentDto
): Promise<OperationResponseDto> => {
  // remove fields with null values in updateInvestmentDto
  // null values indicate that there is no update needed for that field
  if (!updateInvestmentDto.quantity) {
    delete updateInvestmentDto.quantity;
  }
  if (!updateInvestmentDto.avgCost) {
    delete updateInvestmentDto.avgCost;
  }
  const investment = await DBClient.investment.update({
    data: {
      ...updateInvestmentDto,
    },
    where: {
      id: investmentId,
    },
  });
  if (!investment) {
    throw new InternalServerError();
  }
  return {
    success: true,
  };
};

export default {
  getInvestmentsByUserId,
  getInvestmentsByPortfolioId,
  updateInvestment,
};
