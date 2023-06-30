import PullToRefresh from "react-simple-pull-to-refresh";
import { useTranslation } from "react-i18next";
import useDispatchActions from "../hooks/useDispatchActions";
import useNotify from "../hooks/useNotify";
import FavoriteStockList from "../components/FavoriteStockList";
import GoalProgress from "../components/GoalProgress";
import Greeting from "../components/Greeting";
import LanguageSelect from "../components/LanguageSelect";
import Logo from "../components/Logo";
import NetWorth from "../components/NetWorth";
import PortfolioChart from "../components/PortfolioChart";
import emojis from "../constants/emoji.constants";

const Dashboard = () => {
  const { userActions } = useDispatchActions();
  const { t } = useTranslation();
  const { notify } = useNotify();
  const handleRefresh = async () => {
    const timeout = () =>
      setTimeout(() => {
        notify(t("Successfully refreshed data!"));
      }, 500);
    userActions.fetch(timeout);
  };
  const pullingContent = (
    <div className="w-full text-center p-2">
      {t("Refreshing data...")}
      {emojis.smile}
    </div>
  );
  return (
    <PullToRefresh
      onRefresh={handleRefresh}
      pullDownThreshold={84}
      pullingContent={pullingContent}
    >
      <div className="flex flex-col gap-4 w-full p-2">
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
    </PullToRefresh>
  );
};

export default Dashboard;
