import { Investment, Portfolio, Stock, User } from "@prisma/client";
import DBClient from "../../prisma/DBClient";
import { EntityNotFoundError } from "../global/errors.global";

interface PublicUser {
  id: string;
  email: string;
  username: string;
  favoritePortfolios: string[];
  favoriteStocks: string[];

  portfolios: Portfolio[];
  investments: Investment[];
  stocks: Stock[];
}

const getPublicUser = async (id: string): Promise<PublicUser> => {
  const user = await getUser(id);
  const {
    email,
    username,
    favoritePortfolios,
    favoriteStocks,
    portfolios,
    investments,
    stocks,
  } = user;
  return {
    id,
    email,
    username,
    portfolios,
    investments,
    stocks,
    favoritePortfolios,
    favoriteStocks,
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

const getFavoritePortfolios = async (id: string) => {
  const user = await DBClient.user.findUnique({
    where: {
      id,
    },
    select: {
      favoritePortfolios: true,
    },
  });
  if (!user) {
    throw new EntityNotFoundError();
  }
  return user.favoritePortfolios;
};

const addToFavoritePortfolios = async (id: string, portfolioId: string) => {
  const user = await DBClient.user.findUnique({
    where: {
      id,
    },
    select: {
      favoritePortfolios: true,
    },
  });
  if (!user) {
    throw new EntityNotFoundError();
  }
  if (user.favoritePortfolios.includes(portfolioId)) {
    return user.favoritePortfolios;
  }
  // add portfolioId to favorites only if it doesn't already exist
  const udpatedUser = await DBClient.user.update({
    data: {
      favoritePortfolios: {
        set: [...user.favoritePortfolios, portfolioId],
      },
    },
    where: {
      id,
    },
  });
  return udpatedUser.favoritePortfolios;
};

const deleteFromFavoritePortfolios = async (
  id: string,
  portfolioId: string
) => {
  const user = await DBClient.user.findUnique({
    where: {
      id,
    },
    select: {
      favoritePortfolios: true,
    },
  });
  if (!user) {
    throw new EntityNotFoundError();
  }
  if (!user.favoritePortfolios.includes(portfolioId)) {
    return user.favoritePortfolios;
  }
  const udpatedUser = await DBClient.user.update({
    data: {
      favoritePortfolios: {
        set: user.favoritePortfolios.filter(
          favoritePortfolioId => favoritePortfolioId !== portfolioId
        ),
      },
    },
    where: {
      id,
    },
  });
  return udpatedUser.favoritePortfolios;
};

const getFavoritStocks = async (id: string) => {
  const user = await DBClient.user.findUnique({
    where: {
      id,
    },
    select: {
      favoriteStocks: true,
    },
  });
  if (!user) {
    throw new EntityNotFoundError();
  }
  return user.favoriteStocks;
};

const addToFavoriteStocks = async (id: string, stockId: string) => {
  const user = await DBClient.user.findUnique({
    where: {
      id,
    },
    select: {
      favoriteStocks: true,
    },
  });
  if (!user) {
    throw new EntityNotFoundError();
  }
  if (user.favoriteStocks.includes(stockId)) {
    return user.favoriteStocks;
  }
  // add portfolioId to favorites only if it doesn't already exist
  const udpatedUser = await DBClient.user.update({
    data: {
      favoriteStocks: {
        set: [...user.favoriteStocks, stockId],
      },
    },
    where: {
      id,
    },
  });
  return udpatedUser.favoriteStocks;
};

const deleteFromFavoriteStocks = async (id: string, stockId: string) => {
  const user = await DBClient.user.findUnique({
    where: {
      id,
    },
    select: {
      favoriteStocks: true,
    },
  });
  if (!user) {
    throw new EntityNotFoundError();
  }
  if (!user.favoriteStocks.includes(stockId)) {
    return user.favoriteStocks;
  }
  const udpatedUser = await DBClient.user.update({
    data: {
      favoriteStocks: {
        set: user.favoriteStocks.filter(
          favoriteStockId => favoriteStockId !== stockId
        ),
      },
    },
    where: {
      id,
    },
  });
  return udpatedUser.favoriteStocks;
};

export interface StockPrice {
  [key: string]: number; // key: stock symbol, value: price
}

/**
 *
 * @param id userId
 * @param stockPrice { [stockId]: price (number)}
 */

// const updateNetWorth = async (id: string, stockPrice: StockPrice) => {
//   const user = await getUser(id, ["investments"]);
//   const getCurrenNetWorth = () => {
//     const netWorth = user.investments.reduce((prev, investment) => {
//       return prev + stockPrice[investment.stockId] * investment.quantity;
//     }, 0);
//     return netWorth;
//   };
//   await DBClient.user.update({
//     data: {
//       netWorths: {
//         push: [getCurrenNetWorth()],
//       },
//     },
//     where: {
//       id,
//     },
//   });
// };

export default {
  getPublicUser,
  getUser,
  addStock,
  getStocks,
  getFavoritePortfolios,
  addToFavoritePortfolios,
  deleteFromFavoritePortfolios,
  getFavoritStocks,
  addToFavoriteStocks,
  deleteFromFavoriteStocks,
};
