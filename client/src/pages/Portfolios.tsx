import { FC } from "react";
import PortfolioList from "../components/PortfolioList";
import InvestmentList from "../components/InvestmentList";

const Portfolios: FC = () => {
  return (
    <div className="w-full h-full grid md:grid-cols-3 gap-4 p-4 overflow-y-auto">
      <div />
      <PortfolioList />
      <InvestmentList />
    </div>
  );
};

export default Portfolios;
