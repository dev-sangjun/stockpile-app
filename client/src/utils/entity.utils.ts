import { Investments } from "../states/investments.reducer";
import { Investment, Portfolio } from "../types/entity.types";

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

export const getInvestmentsFromPortfolios = (
  portfolios: Portfolio[]
): Investments => {
  const investments: Investments = {};
  portfolios.forEach(portfolio => {
    portfolio.investments.forEach(investment => {
      // update investment if it already exists in investments
      const prevInvestment = investments?.[investment.stockId]; // use stock symbol as the key
      if (prevInvestment) {
        investments[investment.stockId] = addInvestments(
          prevInvestment,
          investment
        );
      } else {
        investments[investment.stockId] = investment;
      }
    });
  });
  return investments;
};
