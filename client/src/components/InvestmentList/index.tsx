import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../states/store";
import {
  deselectPortfolio,
  getFavoriteStocks,
  getSelectedPortfolio,
  getStocks,
} from "../../states/user.reducer";
import { renderInvestmentListItems } from "./renderer";
import { HiArrowLeft, HiPencilSquare, HiTrash } from "react-icons/hi2";
import AddInvestmentDropdown from "./AddInvestmentDropdown";
import { renderPortfolioGridItems } from "../EntityListGridItem/renderer";
import { getPortfolioDetails } from "../../utils/entity.utils";
import {
  openDeleteEntityModal,
  openUpdateEntityModal,
} from "../../states/modal.reducer";
import { toUSD } from "../../utils/common.utils";

const InvestmentList: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedPortfolio = useSelector((state: RootState) =>
    getSelectedPortfolio(state)
  );
  const stocks = useSelector((state: RootState) => getStocks(state));
  const favoriteStocks = useSelector((state: RootState) =>
    getFavoriteStocks(state)
  );
  if (!selectedPortfolio) {
    return null;
  }
  const portfolioDetails = getPortfolioDetails(selectedPortfolio, stocks);
  const handleBackButton = () => dispatch(deselectPortfolio());
  const handleUpdatePortfolio = () => {
    dispatch(
      openUpdateEntityModal({
        entity: selectedPortfolio,
        entityType: "Portfolio",
      })
    );
  };
  const handleDeletePortfolio = () => {
    dispatch(
      openDeleteEntityModal({
        entity: selectedPortfolio,
        entityType: "Portfolio",
      })
    );
  };
  const actionButtons = (
    <>
      <AddInvestmentDropdown />
      <button
        className="btn btn-sm btn-ghost text-base"
        onClick={handleUpdatePortfolio}
      >
        <HiPencilSquare />
      </button>
      <button
        className="btn btn-sm btn-ghost text-base"
        onClick={handleDeletePortfolio}
      >
        <HiTrash />
      </button>
    </>
  );
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center">
        <div className="flex flex-1 items-center gap-2">
          {selectedPortfolio && (
            <HiArrowLeft
              className="hover:cursor-pointer"
              onClick={handleBackButton}
            />
          )}
          <h2 className="text-xl font-bold">{selectedPortfolio?.name}</h2>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs text-slate-500">Total Balance</span>
          <span className="text-xs font-bold">
            {toUSD(portfolioDetails.totalValue)}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-2">
          {renderPortfolioGridItems(portfolioDetails)}
        </div>
        <div className="flex justify-around">{actionButtons}</div>
      </div>
      <ul className="flex flex-col gap-4">
        {renderInvestmentListItems(
          selectedPortfolio?.investments || [],
          favoriteStocks,
          true
        )}
      </ul>
    </div>
  );
};

export default InvestmentList;
