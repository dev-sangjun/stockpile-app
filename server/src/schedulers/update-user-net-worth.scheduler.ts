import userService, { StockPrice } from "../services/user.service";
import DBClient from "../../prisma/DBClient";

const getStocksPrice = (stocks: { id: string; c: number }[]): StockPrice => {
  const stockPrice: StockPrice = {};
  stocks.forEach(stock => {
    stockPrice[stock.id] = stock.c;
  });
  return stockPrice;
};

const updateUserNetWorth = async () => {
  const startTime = new Date().getTime();
  const stocks = await DBClient.stock.findMany({
    select: {
      id: true,
      c: true,
    },
  });
  const stockPrice = getStocksPrice(stocks);
  const users = await DBClient.user.findMany({
    select: {
      id: true,
    },
  });
  const userIds = users.map(user => user.id);
  for (const userId of userIds) {
    try {
      await userService.updateNetWorth(userId, stockPrice);
    } catch (e) {
      console.error(e);
      console.log(`There was an error while updating user: ${userId}`);
    }
  }
  const endTime = new Date().getTime();
  console.log(`Net worth update complete in ${endTime - startTime}ms`);
};

export default updateUserNetWorth;
