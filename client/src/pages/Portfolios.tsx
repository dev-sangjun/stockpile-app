import { FC } from "react";
import PortfolioList from "../components/PortfolioList";
import PortfolioOverview from "../components/PortfolioOverview";

const Portfolios: FC = () => {
  return (
    <div className="w-full h-full grid grid-cols-2 gap-4 p-4 overflow-y-auto">
      <PortfolioOverview className="sm:col-span-2 md:col-span-1" />
      <PortfolioList />
    </div>
  );
};

export default Portfolios;
