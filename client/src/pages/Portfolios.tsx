import { FC } from "react";
import PortfolioList from "../components/PortfolioList";
import StockList from "../components/InvestmentList";

const Portfolios: FC = () => {
  return (
    <div className="w-full h-full grid md:grid-cols-2 gap-4 p-4 pb-40 overflow-y-auto">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Portfolios</h2>
        <PortfolioList />
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Stocks</h2>
        <StockList />
      </div>
    </div>
  );
};

export default Portfolios;
