import { FC } from "react";
import FavoriteStocks from "../components/FavoriteStocks";
import PortfolioValues from "../components/PortfolioValues";
import DistributionCard from "../components/DistributionCard";
import NetWorth from "../components/NetWorth";
import GoalProgress from "../components/GoalProgress";
import Greeting from "../components/Greeting";

const Home: FC = () => {
  return (
    <div className="flex flex-col gap-4 w-full p-4">
      <div className="border-b border-b-slate-200 pb-8">
        <Greeting />
      </div>
      <div className="grid grid-cols-4 grid-flow-row-dense gap-4">
        <div className="col-span-4 md:col-span-3 row-span-1">
          <PortfolioValues />
        </div>
        <div className="col-span-4 md:col-span-1 flex flex-col gap-4">
          <div className="p-4">
            <NetWorth />
          </div>
          <div className="flex-1 p-4">
            <GoalProgress />
          </div>
        </div>
      </div>
      <FavoriteStocks />
    </div>
  );
};

export default Home;
