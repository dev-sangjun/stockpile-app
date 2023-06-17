import { FC, useMemo } from "react";
import { Investment } from "../../types/entity.types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../states/store";
import { HiPencilSquare, HiTrash } from "react-icons/hi2";
import {
  asyncAddToFavoriteStocks,
  asyncDeleteFromFavoriteStocks,
} from "../../states/user.reducer";
import FavoritesButton from "../FavoritesButton";
import { getInvestmentDetails } from "../../utils/entity.utils";
import useUserState from "./useUserInfo";
import EntityListItem from "../EntityListItem";
import {
  openDeleteEntityModal,
  openUpdateEntityModal,
} from "../../states/modal.reducer";

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
  const handleUpdateInvestment = () => {
    dispatch(
      openUpdateEntityModal({
        entity: investment,
        entityType: "Investment",
      })
    );
  };
  const handleDeleteInvestment = () => {
    dispatch(
      openDeleteEntityModal({
        entity: investment,
        entityType: "Investment",
      })
    );
  };
  const handleFavoriteClick = () => {
    isFavorite
      ? dispatch(asyncDeleteFromFavoriteStocks(investment.stockId))
      : dispatch(asyncAddToFavoriteStocks(investment.stockId));
  };
  const actionButtons = (
    <>
      <FavoritesButton isFavorite={isFavorite} onClick={handleFavoriteClick} />
      {selectedPortfolio && (
        <>
          <button
            className="btn btn-sm btn-ghost text-base"
            onClick={handleUpdateInvestment}
          >
            <HiPencilSquare />
          </button>
          <button
            className="btn btn-sm btn-ghost text-base"
            onClick={handleDeleteInvestment}
          >
            <HiTrash />
          </button>
        </>
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
