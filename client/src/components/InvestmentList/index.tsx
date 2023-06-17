import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../states/store";
import {
  deselectPortfolio,
  getFavoriteStocks,
  getSelectedPortfolio,
} from "../../states/user.reducer";
import { renderInvestmentListItems } from "./renderer";
import { HiArrowLeft } from "react-icons/hi2";
import AddInvestmentDropdown from "./AddInvestmentDropdown";

const InvestmentList: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedPortfolio = useSelector((state: RootState) =>
    getSelectedPortfolio(state)
  );
  const favoriteStocks = useSelector((state: RootState) =>
    getFavoriteStocks(state)
  );
  const getActionButtons = () => {
    return (
      selectedPortfolio && (
        <div className="flex items-center gap-2">
          <AddInvestmentDropdown />
        </div>
      )
    );
  };
  const handleBackButton = () => dispatch(deselectPortfolio());
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {selectedPortfolio && (
            <HiArrowLeft
              className="hover:cursor-pointer"
              onClick={handleBackButton}
            />
          )}
          <h2 className="text-xl font-bold">{selectedPortfolio?.name}</h2>
        </div>
        {getActionButtons()}
      </div>
      <ul className="flex flex-col gap-4">
        {renderInvestmentListItems(
          selectedPortfolio?.investments || [],
          favoriteStocks
        )}
      </ul>
    </div>
  );
};

export default InvestmentList;
