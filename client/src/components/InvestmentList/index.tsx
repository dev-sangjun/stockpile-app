import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../states/store";
import AddInvestment from "../AddInvestment";
import {
  deselectPortfolio,
  getInvestments,
  getSelectedPortfolio,
} from "../../states/user.reducer";
import { renderInvestments } from "./renderer";

const InvestmentList: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const allInvestments = useSelector((state: RootState) =>
    getInvestments(state)
  );
  const selectedPortfolio = useSelector((state: RootState) =>
    getSelectedPortfolio(state)
  );
  // show all investments if no portfolio is selected
  const investments =
    selectedPortfolio?.investments ?? Object.values(allInvestments);
  const title = selectedPortfolio?.name || "All Investments";
  const getActionButtons = () => {
    const handleShowAllClick = () => dispatch(deselectPortfolio());
    return (
      selectedPortfolio && (
        <div className="flex items-center gap-2">
          <button className="btn btn-xs btn-ghost" onClick={handleShowAllClick}>
            Show All
          </button>
          <AddInvestment />
        </div>
      )
    );
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{title}</h2>
        {getActionButtons()}
      </div>
      <ul className="flex flex-col gap-4">{renderInvestments(investments)}</ul>
    </div>
  );
};

export default InvestmentList;
