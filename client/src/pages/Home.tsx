import { FC } from "react";
import FavoriteStocks from "../components/FavoriteStocks";
import PortfolioValuesCard from "../components/PortfolioValuesCard";
import DistributionCard from "../components/DistributionCard";
import NetWorth from "../components/NetWorth";
import GoalProgress from "../components/GoalProgress";

const Home: FC = () => {
  return (
    <div className="w-full grid grid-cols-4 grid-rows-3 md:grid-rows-4 gap-4 p-4 pb-12">
      <div className="col-span-4 md:col-span-3 row-span-1 md:row-span-2">
        <PortfolioValuesCard />
      </div>
      <div className="card col-span-2 md:col-span-1 flex flex-col gap-4">
        <div className="flex-1 card bg-base-100 p-4">
          <NetWorth />
        </div>
        <div className="flex-1 card bg-base-100 p-4">
          <GoalProgress />
        </div>
      </div>
      <div className="card bg-base-100 col-span-2 md:col-span-1">
        <DistributionCard />
      </div>
      <div className="col-span-4">
        <FavoriteStocks />
      </div>
    </div>
  );
};

export default Home;
