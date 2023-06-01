import { FC } from "react";
import { Portfolio } from "../../types/entity.types";
import { useSelector } from "react-redux";
import { RootState } from "../../states/store";
import { getStocks } from "../../states/stocks.reducer";
import { toUSD } from "../../utils/numeral.utils";

interface PortfolioListItemProps {
  portfolio: Portfolio;
}

const PortfolioListItem: FC<PortfolioListItemProps> = ({ portfolio }) => {
  const stocks = useSelector((state: RootState) => getStocks(state));
  const getTotalValue = () => {
    const totalValue = portfolio.investments.reduce((prev, cur) => {
      const curValue = stocks?.[cur.stockId]?.c || 0;
      return prev + curValue * cur.quantity;
    }, 0);
    return toUSD(totalValue);
  };

  return (
    <li>
      <div className="flex justify-between items-center">
        <h3>{portfolio.name}</h3>
        <span>{getTotalValue()}</span>
      </div>
    </li>
  );
};

export default PortfolioListItem;
