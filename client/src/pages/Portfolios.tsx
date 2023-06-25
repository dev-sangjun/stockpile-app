import DistributionChart from "../components/common/DistributionChart";
import PortfolioList from "../components/desktop/PortfolioList";
import PortfoliosOverview from "../components/desktop/PortfoliosOverview";

const Portfolios = () => {
  return (
    <div className="w-full grid grid-cols-2 grid-rows-[39rem] gap-4">
      <div className="flex flex-col gap-4">
        <PortfoliosOverview />
        <DistributionChart />
      </div>
      <PortfolioList />
    </div>
  );
};

export default Portfolios;
