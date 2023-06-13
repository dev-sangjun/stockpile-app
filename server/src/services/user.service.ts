import { Investment, Portfolio, Stock, User } from "@prisma/client";
import bcrypt from "bcryptjs";
import DBClient from "../../prisma/DBClient";
import { EntityNotFoundError } from "../global/errors.global";
import stockService from "./stock.service";
import { InternalServerError } from "../global/errors.global";

interface PublicUser {
  id: string;
  email: string;
  username: string;
  favoritePortfolios: string[];
  favoriteStocks: string[];
  goalAmount: number;

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
    goalAmount,
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
    goalAmount,
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

const getNewStocks = (
  investments: { stockId: string }[],
  stocks: Stock[],
  stockId: string
) => {
  // - add stocks only if it doens't already exist
  // - upon deleting from favorite stocks,
  //   delete the stock from stocks if it's not one of the user's investments
  const investmentWithStockId = investments.find(
    investment => investment.stockId === stockId
  );
  return investmentWithStockId
    ? stocks
    : stocks.filter(stock => stock.id !== stockId);
};

const addToFavoriteStocks = async (id: string, stockId: string) => {
  const user = await DBClient.user.findUnique({
    where: {
      id,
    },
    select: {
      favoriteStocks: true,
      investments: {
        select: {
          stockId: true,
        },
      },
      stocks: true,
    },
  });
  if (!user) {
    throw new EntityNotFoundError();
  }
  if (user.favoriteStocks.includes(stockId)) {
    return user.favoriteStocks;
  }
  // add portfolioId to favorites only if it doesn't already exist
  const stock = await stockService.getStock(stockId);
  if (!stock) {
    throw new EntityNotFoundError();
  }
  const newStocks = getNewStocks(user.investments, user.stocks, stockId).map(
    stock => ({
      id: stock.id,
    })
  );
  const udpatedUser = await DBClient.user.update({
    data: {
      favoriteStocks: {
        set: [...user.favoriteStocks, stockId],
      },
      stocks: {
        set: newStocks,
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
      investments: {
        select: {
          stockId: true,
        },
      },
      stocks: true,
    },
  });
  if (!user) {
    throw new EntityNotFoundError();
  }
  const newStocks = getNewStocks(user.investments, user.stocks, stockId).map(
    stock => ({
      id: stock.id,
    })
  );
  const udpatedUser = await DBClient.user.update({
    data: {
      favoriteStocks: {
        set: user.favoriteStocks.filter(
          favoriteStockId => favoriteStockId !== stockId
        ),
      },
      stocks: {
        set: newStocks,
      },
    },
    where: {
      id,
    },
  });
  return udpatedUser.favoriteStocks;
};

const deleteStockWithNoReferenceFromUser = async (
  userId: string,
  stockId: string
) => {
  const user = await getUser(userId);
  if (user.investments.find(investment => investment.stockId === stockId)) {
    return;
  }
  if (user.favoriteStocks.includes(stockId)) {
    return;
  }
  // delete stock only if it's not part of any entities (investment, favoriteStocks)
  const updatedUser = await DBClient.user.update({
    data: {
      stocks: {
        set: user.stocks
          .filter(stock => stock.id !== stockId)
          .map(stock => ({
            id: stock.id,
          })),
      },
    },
    where: {
      id: userId,
    },
    include: {
      stocks: true,
    },
  });
  if (!updatedUser) {
    return new InternalServerError();
  }
};

const updatePassword = async (
  id: string,
  newPassword: string
): Promise<{
  success: boolean;
  message?: string;
}> => {
  const user = await getUser(id, []);
  if (bcrypt.compareSync(newPassword, user.password)) {
    // old & new passwords are equal
    return {
      success: false,
      message: "Please provide a new password.",
    };
  }
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  const updatedUser = await DBClient.user.update({
    data: {
      password: hashedPassword,
    },
    where: {
      id,
    },
  });
  if (!updatedUser) {
    throw new InternalServerError();
  }
  return {
    success: true,
    message: "Successfully updated the password.",
  };
};

export interface StockPrice {
  [key: string]: number; // key: stock symbol, value: price
}

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
  deleteStockWithNoReferenceFromUser,
  updatePassword,
};
