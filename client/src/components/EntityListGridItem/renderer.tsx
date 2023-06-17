import GridItem, { GridItemProps } from ".";
import { Investment, Stock, Stocks } from "../../types/entity.types";
import {
  InvestmentDetails,
  PortfolioDetails,
  getTotalInvestedAmount,
  getTotalNetWorth,
} from "../../utils/entity.utils";
import { toUSD } from "../../utils/numeral.utils";
import ValueChangeText from "../ValueChangeText";

const getPortfolioGridItems = (
  portfolioDetails: PortfolioDetails
): GridItemProps[] => [
  {
    title: "Invested",
    text: toUSD(portfolioDetails.totalCost),
  },
  {
    title: "Gain/Loss",
    text: (
      <ValueChangeText
        value={portfolioDetails.totalValue - portfolioDetails.totalCost}
      />
    ),
  },
  {
    title: "Day Change",
    text: <ValueChangeText value={portfolioDetails.dayChange} />,
  },
  {
    title: "Investments",
    text: String(portfolioDetails.investmentsCount),
  },
];

const getInvestmentGridItems = (
  investmentDetails: InvestmentDetails
): GridItemProps[] => [
  {
    title: "Invested",
    text: toUSD(investmentDetails.totalCost),
  },
  {
    title: "Gain/Loss",
    text: (
      <ValueChangeText
        value={investmentDetails.totalValue - investmentDetails.totalCost}
      />
    ),
  },
  {
    title: "Day Change",
    text: <ValueChangeText value={investmentDetails.dayChange} />,
  },
  {
    title: "Shares",
    text: String(investmentDetails.quantity),
  },
];

const getFavoriteStockGridItems = (
  stock: Stock,
  quantity: number
): GridItemProps[] => [
  {
    title: "Day Change",
    text: <ValueChangeText value={stock.c - stock.pc} />,
  },
  {
    title: "# of Shares",
    text: String(quantity),
  },
];

const getPortfolioOverviewGridItems = (
  investments: Investment[],
  stocks: Stocks
): GridItemProps[] => {
  const totalNetWorth = getTotalNetWorth(investments, stocks);
  const totalInvestedAmount = getTotalInvestedAmount(investments);
  const gainLoss = totalNetWorth - totalInvestedAmount;
  const investmentCount = investments.length;
  return [
    {
      className: "col-span-2",
      title: "Total Value",
      text: toUSD(totalNetWorth),
    },
    {
      className: "col-span-2",
      title: "Total Invested",
      text: toUSD(totalInvestedAmount),
    },
    {
      title: "Total Gain/Loss ($)",
      text: <ValueChangeText value={gainLoss} />,
    },
    {
      title: "Total Gain/Loss (%)",
      text: <ValueChangeText value={gainLoss / totalInvestedAmount} />,
    },
    {
      title: "Total investments",
      text: String(investmentCount),
    },
  ];
};

const renderGridItems = (gridItems: GridItemProps[]) =>
  gridItems.map(gridItem => <GridItem key={gridItem.title} {...gridItem} />);

export const renderPortfolioGridItems = (portfolioDetails: PortfolioDetails) =>
  renderGridItems(getPortfolioGridItems(portfolioDetails));

export const renderInvestmentGridItems = (
  investmentDetails: InvestmentDetails
) => renderGridItems(getInvestmentGridItems(investmentDetails));

export const renderFavoriteStockGridItems = (stock: Stock, quantity: number) =>
  renderGridItems(getFavoriteStockGridItems(stock, quantity));

export const renderPortfolioOverviewGridItems = (
  investments: Investment[],
  stocks: Stocks
) => renderGridItems(getPortfolioOverviewGridItems(investments, stocks));
