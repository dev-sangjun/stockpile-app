import { Company, Investment, Portfolio, Stock, User } from "@prisma/client";
import DBClient from "../../prisma/DBClient";
import { EntityNotFoundError } from "../global/errors.global";

interface PublicUser {
  id: string;
  portfolios: Portfolio[];
  investments: Investment[];
  stocks: Stock[];
}
const getPublicUser = async (id: string): Promise<PublicUser> => {
  const user = await getUser(id);
  const { portfolios, investments, stocks } = user;
  return {
    id,
    portfolios,
    investments,
    stocks,
  };
};

const getUser = async (
  id: string,
  include: string[] = ["portfolios", "investments", "stocks"]
) => {
  const user = await DBClient.user.findUnique({
    where: {
      id,
    },
    include: {
      portfolios: include.includes("portfolios")
        ? {
            include: {
              investments: true,
            },
          }
        : false,
      investments: include.includes("investments"),
      stocks: include.includes("stocks")
        ? {
            include: {
              company: true,
            },
          }
        : false,
    },
  });
  if (!user) {
    throw new EntityNotFoundError();
  }
  return user;
};

const addStock = async (id: string, stock: Stock) => {
  const user = await getUser(id, ["stocks"]);
  const hasStock = () =>
    user.stocks.filter(({ id }) => stock.id === id).length > 0;
  if (!hasStock()) {
    // add stock to user.stocks only if it doesn't exist
    const newStocks = [...user.stocks, stock];
    await DBClient.user.update({
      data: {
        stocks: {
          set: newStocks.map(stock => ({ id: stock.id })),
        },
      },
      where: {
        id,
      },
    });
  }
};

const getStocks = async (id: string) => {
  const user = await getUser(id, ["stocks"]);
  return user.stocks;
};

export default {
  getPublicUser,
  getUser,
  addStock,
  getStocks,
};
