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
  return (
    <div className="w-full h-full grid md:grid-cols-2 gap-4 p-4 pb-40 overflow-y-auto">
      <PortfolioList />
      <InvestmentList />
    </div>
  );
};

export default Portfolios;
