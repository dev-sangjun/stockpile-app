import FavoriteStockList from "../components/FavoriteStockList";
import GoalProgress from "../components/GoalProgress";
import Greeting from "../components/Greeting";
import LanguageSelect from "../components/LanguageSelect";
import Logo from "../components/Logo";
import NetWorth from "../components/NetWorth";
import PortfolioChart from "../components/PortfolioChart";
import PullToRefreshContainer from "../components/PullToRefreshContainer";

const Dashboard = () => {
  return (
    <PullToRefreshContainer>
      <div className="flex flex-col gap-4 w-full h-full p-4 pt-2 overflow-y-auto">
        <div className="relative flex justify-center md:hidden">
          <Logo />
          <LanguageSelect
            className="absolute right-0 top-1/2 translate-y-[-50%]"
            isMobile
          />
        </div>
        <div className="md:mb-8">
          <Greeting />
        </div>
        <div className="grid grid-cols-4 grid-flow-row-dense gap-4">
          <div className="col-span-4 md:col-span-3">
            <PortfolioChart />
          </div>
          <div className="col-span-4 md:col-span-1 flex flex-col justify-between card border-2 border-dashed border-slate-200 p-4 md:p-6 gap-2">
            <NetWorth />
            <div className="">
              <GoalProgress />
            </div>
          </div>
        </div>
        <FavoriteStockList />
      </div>
    </PullToRefreshContainer>
  );
};

export default Dashboard;
