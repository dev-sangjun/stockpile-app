import { Stock } from "@prisma/client";
import DBClient from "../../prisma/DBClient";
import { EntityNotFoundError } from "../global/errors.global";

const getUserById = async (id: string, include: string[] = []) => {
  const user = await DBClient.user.findUnique({
    where: {
      id,
    },
    include: {
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
  const user = await getUserById(id, ["stocks"]);
  const hasStock = () =>
    user.stocks.filter(({ id }) => stock.id === id).length > 0;
  if (!hasStock()) {
    // add stock to user.stocks only it doesn't exist
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
  const user = await getUserById(id, ["stocks"]);
  return user.stocks;
};

export default {
  getUserById,
  addStock,
  getStocks,
};
