import { FC } from "react";
import FavoriteStocks from "../components/FavoriteStocks";
import PortfolioValuesCard from "../components/PortfolioValuesCard";
import DistributionCard from "../components/DistributionCard";
import NetWorth from "../components/NetWorth";
import GoalProgress from "../components/GoalProgress";

const Home: FC = () => {
  return (
    <div className="w-full grid grid-cols-4 grid-flow-row-dense gap-4 p-4">
      <div className="col-span-4 md:col-span-3 row-span-1">
        <PortfolioValuesCard />
      </div>
      <div className="col-span-4 md:col-span-1 flex flex-col gap-4">
        <div className="card bg-base-100 p-4">
          <NetWorth />
        </div>
        <div className="flex-1 card bg-base-100 p-4">
          <GoalProgress />
        </div>
        <div className="card bg-base-100 p-4">
          <DistributionCard />
        </div>
      </div>
      <div className="col-span-4">
        <FavoriteStocks />
      </div>
    </div>
  );
};

export default Home;
