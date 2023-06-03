import { FC } from "react";
import PortfolioList from "../components/PortfolioList";
import InvestmentList from "../components/InvestmentList";
import { RootState } from "../states/store";
import { getInvestments } from "../states/investments.reducer";
import {
  deselectPortfolio,
  getSelectedPortfolio,
} from "../states/portfolios.reducer";
import { useDispatch, useSelector } from "react-redux";
import AddInvestment from "../components/AddInvestment";

const Portfolios: FC = () => {
  const dispatch = useDispatch();
  const allInvestments = useSelector((state: RootState) =>
    getInvestments(state)
  );
  const selectedPortfolio = useSelector((state: RootState) =>
    getSelectedPortfolio(state)
  );
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
    <div className="w-full h-full grid md:grid-cols-2 gap-4 p-4 pb-40 overflow-y-auto">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Portfolios</h2>
        <PortfolioList />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{title}</h2>
          {getActionButtons()}
        </div>
        <InvestmentList
          investments={
            // show investments in selected portfolio
            // show all investments if no portfolio is selected
            selectedPortfolio?.investments ?? Object.values(allInvestments)
          }
        />
      </div>
    </div>
  );
};

export default Portfolios;
