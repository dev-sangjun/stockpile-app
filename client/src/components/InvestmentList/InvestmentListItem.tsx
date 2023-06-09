import { FC, useMemo } from "react";
import { Investment } from "../../types/entity.types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../states/store";
import { HiTrash } from "react-icons/hi2";
import {
  asyncAddToFavoriteStocks,
  asyncDeleteFromFavoriteStocks,
} from "../../states/user.reducer";
import FavoritesButton from "../FavoritesButton";
import { getInvestmentDetails } from "../../utils/entity.utils";
import useHandleDeleteInvestment from "./useHandleDeleteInvestment";
import useUserState from "./useUserInfo";
import EntityListItem from "../EntityListItem";

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
  const actionButtons = (
    <>
      <FavoritesButton isFavorite={isFavorite} onClick={handleFavoriteClick} />
      {selectedPortfolio && (
        <button
          className="btn btn-xs btn-ghost"
          onClick={handleDeleteInvestment}
        >
          <HiTrash />
        </button>
      )}
    </>
  );
  return (
    <EntityListItem
      entityType="Investment"
      logoUrl={logoUrl}
      title={investment.stockId}
      actionButtons={actionButtons}
      valueLabel="Current Price"
      entityDetails={investmentDetails}
    />
  );
};

export default InvestmentListItem;
