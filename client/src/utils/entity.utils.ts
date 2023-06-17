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

/**
 *
 * @param portfolio Portfolio
 * @param stocks { stockId: Stock }
 * @returns portfolio value (sum of all investments in a single portfolio)
 */
export const getPortfolioTotalValue = (portfolio: Portfolio, stocks: Stocks) =>
  portfolio.investments.reduce((prev, investment) => {
    const { quantity, stockId } = investment;
    return prev + (stocks?.[stockId]?.c || 0) * quantity;
  }, 0);

export interface PortfolioDetails {
  totalValue: number;
  totalCost: number;
  investmentsCount: number;
  dayChange: number;
}

export const getPortfolioDetails = (portfolio: Portfolio, stocks: Stocks) => {
  let totalValue = 0;
  let totalCost = 0;
  let prevTotalValue = 0;
  portfolio.investments.forEach(({ avgCost, quantity, stockId }) => {
    totalValue += (stocks?.[stockId]?.c || 0) * quantity;
    totalCost += avgCost * quantity;
    prevTotalValue += stocks?.[stockId]?.pc * quantity;
  });
  return {
    totalValue,
    totalCost,
    investmentsCount: portfolio.investments.length,
    dayChange: totalValue - prevTotalValue,
  };
};

export interface InvestmentDetails {
  curPrice: number;
  totalValue: number;
  totalCost: number;
  quantity: number;
  dayChange: number;
}

export const getInvestmentDetails = (
  investment: Investment,
  stocks: Stocks
): InvestmentDetails => {
  const curPrice = stocks?.[investment.stockId]?.c;
  const totalValue = curPrice * investment.quantity;
  const totalCost = investment.avgCost * investment.quantity;
  const dayChange = curPrice - stocks?.[investment.stockId]?.pc;
  return {
    curPrice,
    totalValue,
    totalCost,
    quantity: investment.quantity,
    dayChange,
  };
};

export const getTotalInvestedAmount = (investments: Investment[]) => {
  const total = investments.reduce((prev, investment) => {
    const investedAmount = investment.avgCost * investment.quantity;
    return prev + investedAmount;
  }, 0);
  return total;
};

export const getTotalNetWorth = (investments: Investment[], stocks: Stocks) =>
  investments.reduce((prev, investment) => {
    const { quantity, stockId } = investment;
    return prev + (stocks?.[stockId]?.c || 0) * quantity;
  }, 0);
