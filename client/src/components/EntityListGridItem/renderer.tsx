import GridItem, { GridItemProps } from ".";
import { Stock } from "../../types/entity.types";
import { InvestmentDetails, PortfolioDetails } from "../../utils/entity.utils";
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

const renderGridItems = (gridItems: GridItemProps[]) =>
  gridItems.map(gridItem => <GridItem key={gridItem.title} {...gridItem} />);

export const renderPortfolioGridItems = (portfolioDetails: PortfolioDetails) =>
  renderGridItems(getPortfolioGridItems(portfolioDetails));

export const renderInvestmentGridItems = (
  investmentDetails: InvestmentDetails
) => renderGridItems(getInvestmentGridItems(investmentDetails));

export const renderFavoriteStockGridItems = (stock: Stock, quantity: number) =>
  renderGridItems(getFavoriteStockGridItems(stock, quantity));
