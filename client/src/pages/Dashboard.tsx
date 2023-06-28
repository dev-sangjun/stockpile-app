import FavoriteStockList from "../components/FavoriteStockList";
import GoalProgress from "../components/GoalProgress";
import Greeting from "../components/Greeting";
import NetWorth from "../components/NetWorth";
import PortfolioChart from "../components/PortfolioChart";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-4 w-full p-4">
      <div className="md:mb-8">
        <Greeting />
      </div>
      <div className="grid grid-cols-4 grid-flow-row-dense gap-4">
        <div className="col-span-4 md:col-span-3">
          <PortfolioChart />
        </div>
        <div className="col-span-4 md:col-span-1 flex flex-col card border-2 border-dashed border-slate-200 p-2">
          <div className="p-4">
            <NetWorth />
          </div>
          <div className="flex-1 p-4">
            <GoalProgress />
          </div>
        </div>
      </div>
      <FavoriteStockList />
    </div>
  );
};

export default Dashboard;
