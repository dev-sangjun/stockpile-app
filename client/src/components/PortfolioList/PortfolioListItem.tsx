import { FC, ReactNode, useMemo } from "react";
import { useSelector } from "react-redux";
import { Portfolio } from "../../types/entity.types";
import { RootState } from "../../states/store";
import { getStocks } from "../../states/stocks.reducer";
import { toUSD } from "../../utils/numeral.utils";
import ValueChangeText from "../ValueChangeText";
import { useDispatch } from "react-redux";
import { selectPortfolio } from "../../states/portfolios.reducer";

interface GridItemProps {
  title: string;
  text: string | ReactNode;
}

const GridItem: FC<GridItemProps> = ({ title, text }) => (
  <div className="bg-slate-100 rounded-lg p-2 flex flex-col gap-2">
    <h4 className="text-slate-500 text-sm">{title}</h4>
    <div className="font-bold">{text}</div>
  </div>
);

interface PortfolioListItemProps {
  portfolio: Portfolio;
}

const PortfolioListItem: FC<PortfolioListItemProps> = ({ portfolio }) => {
  const stocks = useSelector((state: RootState) => getStocks(state));
  const dispatch = useDispatch();
  const portfolioDetails = useMemo(() => {
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
  }, [stocks, portfolio.investments]);
  const gridItems: GridItemProps[] = useMemo(
    () => [
      {
        title: "Invested Amount",
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
        title: "# of Investments",
        text: String(portfolioDetails.investmentsCount),
      },
    ],
    [portfolioDetails]
  );
  const renderGridItems = () =>
    gridItems.map(gridItem => <GridItem key={gridItem.title} {...gridItem} />);
  const handleClick = () => {
    dispatch(selectPortfolio(portfolio));
  };
  return (
    <li
      className="card bg-base-100 shadow-xl p-4 flex flex-col gap-4 cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex justify-between items-center h-30">
        <h3 className="text-lg font-bold">{portfolio.name}</h3>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-slate-400">
            Total Balance
          </span>
          <span className="font-bold text-lg">
            {toUSD(portfolioDetails.totalValue)}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 grid-rows-2 gap-2">
        {renderGridItems()}
      </div>
    </li>
  );
};

export default PortfolioListItem;
