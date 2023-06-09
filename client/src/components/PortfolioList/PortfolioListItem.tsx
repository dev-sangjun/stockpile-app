import { FC, useMemo } from "react";
import { useSelector } from "react-redux";
import { Portfolio } from "../../types/entity.types";
import { AppDispatch, RootState } from "../../states/store";
import { toUSD } from "../../utils/numeral.utils";
import ValueChangeText from "../ValueChangeText";
import { useDispatch } from "react-redux";
import { GridItemProps } from "../EntityListGridItem";
import { renderPortfolioGridItems } from "../EntityListGridItem/renderer";
import {
  asyncFetchUser,
  getStocks,
  selectPortfolio,
} from "../../states/user.reducer";
import { HiTrash } from "react-icons/hi2";
import { deletePortfolio } from "../../api/portfolio.api";
import { getUserId } from "../../states/user.reducer";
import { getPortfolioDetails } from "../../utils/entity.utils";

interface PortfolioListItemProps {
  portfolio: Portfolio;
}

const PortfolioListItem: FC<PortfolioListItemProps> = ({ portfolio }) => {
  const userId = useSelector((state: RootState) => getUserId(state));
  const stocks = useSelector((state: RootState) => getStocks(state));
  const dispatch = useDispatch<AppDispatch>();
  const portfolioDetails = useMemo(
    () => getPortfolioDetails(portfolio, stocks),
    [portfolio, stocks]
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
        {renderPortfolioGridItems(portfolioDetails)}
      </div>
    </li>
  );
};

export default PortfolioListItem;
