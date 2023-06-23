import { FC, useMemo } from "react";
import { useSelector } from "react-redux";
import { Portfolio } from "../../types/entity.types";
import { AppDispatch, RootState } from "../../states/store";
import { useDispatch } from "react-redux";
import { getStocks, selectPortfolio } from "../../states/user.reducer";
import { HiChevronRight } from "react-icons/hi2";
import { getPortfolioDetails } from "../../utils/entity.utils";
import { toUSD } from "../../utils/common.utils";

interface PortfolioListItemProps {
  portfolio: Portfolio;
}

const PortfolioListItem: FC<PortfolioListItemProps> = ({ portfolio }) => {
  const stocks = useSelector((state: RootState) => getStocks(state));
  const dispatch = useDispatch<AppDispatch>();
  const portfolioDetails = useMemo(
    () => getPortfolioDetails(portfolio, stocks),
    [portfolio, stocks]
  );
  const handlePortfolioClick = () => {
    dispatch(selectPortfolio(portfolio));
  };
  return (
    <div
      className="flex items-center min-h-[3.75rem] hover:cursor-pointer"
      onClick={handlePortfolioClick}
    >
      <h3 className="flex-1 text-md font-bold mt-1">{portfolio.name}</h3>
      <div className="flex flex-col items-end">
        <span className="text-xs text-slate-500">Total Balance</span>
        <span className="text-xs font-bold">
          {toUSD(portfolioDetails.totalValue)}
        </span>
      </div>
      <HiChevronRight className="ml-4" />
    </div>
  );
};

export default PortfolioListItem;
