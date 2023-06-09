import { FC, useMemo } from "react";
import { useSelector } from "react-redux";
import { Portfolio } from "../../types/entity.types";
import { AppDispatch, RootState } from "../../states/store";
import { useDispatch } from "react-redux";
import { getStocks, selectPortfolio } from "../../states/user.reducer";
import { HiCheck, HiEye, HiPencilSquare, HiTrash } from "react-icons/hi2";
import { getPortfolioDetails } from "../../utils/entity.utils";
import useHandleDeletePortfolio from "./useHandleDeletePortfolio";
import EntityListItem from "../EntityListItem";

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
  const handleDeletePortfolio = useHandleDeletePortfolio(portfolio.id);
  const actionButtons = (
    <>
      <button className="btn btn-sm btn-ghost text-base">
        <HiPencilSquare />
      </button>
      <button
        className="btn btn-sm btn-ghost text-base"
        onClick={handleDeletePortfolio}
      >
        <HiTrash />
      </button>
      <button
        className="btn btn-sm btn-ghost text-base"
        onClick={handlePortfolioClick}
      >
        <HiEye />
      </button>
    </>
  );
  return (
    <EntityListItem
      entityType="Portfolio"
      title={portfolio.name}
      actionButtons={actionButtons}
      valueLabel="Total Balance"
      entityDetails={portfolioDetails}
      onClick={handlePortfolioClick}
    />
  );
};

export default PortfolioListItem;
