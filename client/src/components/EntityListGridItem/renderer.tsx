import GridItem, { GridItemProps } from ".";
import { Investment, Stock, Stocks } from "../../types/entity.types";
import { toDecimal, toUSD } from "../../utils/common.utils";
import {
  InvestmentDetails,
  PortfolioDetails,
  getTotalInvestedAmount,
  getTotalNetWorth,
} from "../../utils/entity.utils";
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
  return [
    {
      title: "Total Value",
      text: toUSD(totalNetWorth),
    },
    {
      title: "Total Invested",
      text: toUSD(totalInvestedAmount),
    },
    {
      title: "Total Gain/Loss ($)",
      text: <ValueChangeText value={gainLoss} />,
    },
    {
      title: "Total Gain/Loss (%)",
      text: (
        <ValueChangeText
          value={toDecimal(gainLoss / totalInvestedAmount)}
          usePercentage={true}
        />
      ),
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
