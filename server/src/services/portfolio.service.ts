import DBClient from "../../prisma/DBClient";
import { PortfolioGetRequestDto } from "../interfaces/dto/portfolio.dto";

const getPortfolios = async (
  portfolioGetRequestDto: PortfolioGetRequestDto
) => {
  const { userId } = portfolioGetRequestDto;
  const portfolios = await DBClient.portfolio.findMany({
    where: {
      userId,
    },
  });
  return portfolios;
};

export default {
  getPortfolios,
};
