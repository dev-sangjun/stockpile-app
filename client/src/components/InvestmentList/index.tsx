import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../states/store";
import AddInvestment from "./AddInvestment";
import {
  deselectPortfolio,
  getFavoriteStocks,
  getInvestments,
  getSelectedPortfolio,
} from "../../states/user.reducer";
import { renderInvestmentListItems } from "./renderer";
import { HiArrowLeft, HiArrowSmallLeft } from "react-icons/hi2";

const InvestmentList: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const allInvestments = useSelector((state: RootState) =>
    getInvestments(state)
  );
  const selectedPortfolio = useSelector((state: RootState) =>
    getSelectedPortfolio(state)
  );
  const favoriteStocks = useSelector((state: RootState) =>
    getFavoriteStocks(state)
  );
  // show all investments if no portfolio is selected
  const investments =
    selectedPortfolio?.investments ?? Object.values(allInvestments);
  const title = selectedPortfolio?.name || "All Investments";
  const getActionButtons = () => {
    return (
      selectedPortfolio && (
        <div className="flex items-center gap-2">
          <AddInvestment />
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
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
        {getActionButtons()}
      </div>
      <ul className="flex flex-col gap-4">
        {renderInvestmentListItems(investments, favoriteStocks)}
      </ul>
    </div>
  );
};

export default InvestmentList;
