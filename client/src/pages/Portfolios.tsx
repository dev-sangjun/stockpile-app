import { FC } from "react";
import PortfolioList from "../components/PortfolioList";

const Portfolios: FC = () => {
  return (
    <div className="w-full h-full grid grid-cols-2 gap-4 p-4">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Portfolios</h2>
        <PortfolioList />
      </div>
      <div className="card bg-base-100 shadow-xl"></div>
    </div>
  );
};

export default Portfolios;
