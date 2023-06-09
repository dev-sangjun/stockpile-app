import { FC, useMemo } from "react";
import { Investment } from "../../types/entity.types";
import { toUSD } from "../../utils/numeral.utils";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../states/store";
import { renderInvestmentGridItems } from "../EntityListGridItem/renderer";
import { renderCompanyLogo } from "./renderer";
import { HiTrash } from "react-icons/hi2";
import {
  asyncAddToFavoriteStocks,
  asyncDeleteFromFavoriteStocks,
} from "../../states/user.reducer";
import FavoritesButton from "../FavoritesButton";
import { getInvestmentDetails } from "../../utils/entity.utils";
import useHandleDeleteInvestment from "./useHandleDeleteInvestment";
import useUserState from "./useUserInfo";

interface InvestmentItemProps {
  investment: Investment;
  isFavorite: boolean;
}

const InvestmentListItem: FC<InvestmentItemProps> = ({
  investment,
  isFavorite,
}) => {
  const { stocks, selectedPortfolio } = useUserState();
  const dispatch = useDispatch<AppDispatch>();
  const investmentDetails = useMemo(
    () => getInvestmentDetails(investment, stocks),
    [investment, stocks]
  );
  const logoUrl = stocks?.[investment.stockId]?.company?.logo;
  const handleDeleteInvestment = useHandleDeleteInvestment(
    selectedPortfolio?.id,
    investment.id
  );
  const handleFavoriteClick = () => {
    isFavorite
      ? dispatch(asyncDeleteFromFavoriteStocks(investment.stockId))
      : dispatch(asyncAddToFavoriteStocks(investment.stockId));
  };
  return (
    <li className="card bg-base-100 shadow-xl p-4 flex flex-col gap-4">
      <div className="flex items-center h-30 gap-2">
        <div className="flex flex-1 items-center gap-2">
          {renderCompanyLogo(logoUrl)}
          <h3 className="text-lg font-bold">{investment.stockId}</h3>
          <FavoritesButton
            isFavorite={isFavorite}
            onClick={handleFavoriteClick}
          />
          {selectedPortfolio && (
            <button
              className="btn btn-xs btn-ghost"
              onClick={handleDeleteInvestment}
            >
              <HiTrash />
            </button>
          )}
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-slate-400">
            Current Price
          </span>
          <span className="font-bold text-lg">
            {toUSD(stocks?.[investment.stockId]?.c || 0)}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {renderInvestmentGridItems(investmentDetails)}
      </div>
    </li>
  );
};

export default InvestmentListItem;
