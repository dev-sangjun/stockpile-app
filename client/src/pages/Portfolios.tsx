import { FC } from "react";
import PortfolioList from "../components/PortfolioList";
import InvestmentList from "../components/InvestmentList";

const Portfolios: FC = () => {
  return (
    <div className="w-full h-full grid sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 overflow-y-auto">
      <div className="sm:col-span-2 md:col-span-1" />
      <PortfolioList />
      <InvestmentList />
    </div>
  );
};

export default Portfolios;
