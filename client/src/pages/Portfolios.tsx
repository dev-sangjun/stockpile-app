import { FC } from "react";
import PortfolioList from "../components/PortfolioList";
import PortfolioOverview from "../components/PortfolioOverview";

const Portfolios: FC = () => {
  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-4 p-4 overflow-y-auto max-w-5xl mx-auto">
      <PortfolioOverview />
      <PortfolioList />
    </div>
  );
};

export default Portfolios;
