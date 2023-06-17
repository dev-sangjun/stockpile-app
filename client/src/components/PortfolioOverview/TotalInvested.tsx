import { FC } from "react";
import { renderPortfolioOverviewGridItems } from "../EntityListGridItem/renderer";
import { Investment, Stocks } from "../../types/entity.types";

interface TotalInvestedProps {
  investments: Investment[];
  stocks: Stocks;
}

const TotalInvested: FC<TotalInvestedProps> = ({ investments, stocks }) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Overview</h2>
      <div className="card bg-base-100 p-4 grid gap-2 grid-cols-2">
        {renderPortfolioOverviewGridItems(Object.values(investments), stocks)}
      </div>
    </div>
  );
};

export default TotalInvested;
