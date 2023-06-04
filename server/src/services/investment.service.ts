import DBClient from "../../prisma/DBClient";

const getInvestmentsByUserId = async (userId: string) => {
  const investments = await DBClient.investment.findMany({
    where: {
      userId,
    },
  });
  return investments;
};

export default {
  getInvestmentsByUserId,
};
