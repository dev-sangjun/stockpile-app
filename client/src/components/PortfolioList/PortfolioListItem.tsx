import { FC, useMemo } from "react";
import { useSelector } from "react-redux";
import { Portfolio } from "../../types/entity.types";
import { AppDispatch, RootState } from "../../states/store";
import { toUSD } from "../../utils/numeral.utils";
import ValueChangeText from "../ValueChangeText";
import { useDispatch } from "react-redux";
import { GridItemProps } from "../ListGridItem";
import { renderGridItems } from "../ListGridItem/renderer";
import {
  asyncFetchUser,
  getStocks,
  selectPortfolio,
} from "../../states/user.reducer";
import { HiTrash } from "react-icons/hi2";
import { deletePortfolio } from "../../api/portfolio.api";
import { getUserId } from "../../states/user.reducer";

interface PortfolioListItemProps {
  portfolio: Portfolio;
}

const PortfolioListItem: FC<PortfolioListItemProps> = ({ portfolio }) => {
  const userId = useSelector((state: RootState) => getUserId(state));
  const stocks = useSelector((state: RootState) => getStocks(state));
  const dispatch = useDispatch<AppDispatch>();
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
  const handlePortfolioClick = () => {
    dispatch(selectPortfolio(portfolio));
  };
  const handleDeletePortfolio = async () => {
    if (!userId) {
      return;
    }
    await deletePortfolio(portfolio.id);
    dispatch(asyncFetchUser());
  };
  return (
    <li
      className="card bg-base-100 shadow-xl p-4 flex flex-col gap-4 cursor-pointer"
      onClick={handlePortfolioClick}
    >
      <div className="flex justify-between items-center h-30">
        <div className="flex flex-1 items-center gap-2">
          <h3 className="text-lg font-bold">{portfolio.name}</h3>
          <button
            className="btn btn-xs btn-ghost"
            onClick={handleDeletePortfolio}
          >
            <HiTrash />
          </button>
        </div>
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
        {renderGridItems(gridItems)}
      </div>
    </li>
  );
};

export default PortfolioListItem;
