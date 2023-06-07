import {
  Investment,
  Investments,
  Portfolio,
  Stock,
  Stocks,
} from "../types/entity.types";

const addInvestments = (
  prevInvestment: Investment,
  curInvestmnent: Investment
): Investment => {
  const totalValue =
    prevInvestment.avgCost * prevInvestment.quantity +
    curInvestmnent.avgCost * curInvestmnent.quantity;
  const totalQuantity = prevInvestment.quantity + curInvestmnent.quantity;
  return {
    ...prevInvestment,
    avgCost: totalValue / totalQuantity,
    quantity: totalQuantity,
  };
};

/**
 *
 * @param investments Investment[] fetched from the server
 * @returns Investments object with key == stockId & value == Investment
 */
export const getInvestmentsObject = (
  investments: Investment[]
): Investments => {
  const investmentsObject: Investments = {};
  investments.forEach(investment => {
    // update investment if it already exists in investments
    const prevInvestment = investmentsObject?.[investment.stockId]; // use stock symbol as the key
    if (prevInvestment) {
      investmentsObject[investment.stockId] = addInvestments(
        prevInvestment,
        investment
      );
    } else {
      investmentsObject[investment.stockId] = investment;
    }
  });
  return investmentsObject;
};

/**
 *
 * @param stocks Stock[] fetched from the server
 * @returns Stocks object with key == stockId & value == Stock
 */
export const getStocksObject = (stocks: Stock[]): Stocks => {
  const stocksObject: Stocks = {};
  stocks.forEach(stock => {
    stocksObject[stock.id] = stock;
  });
  return stocksObject;
};

export const getPortfolioTotalValue = (portfolio: Portfolio, stocks: Stocks) =>
  portfolio.investments.reduce((prev, investment) => {
    const { quantity, stockId } = investment;
    return prev + (stocks?.[stockId]?.c || 0) * quantity;
  }, 0);
