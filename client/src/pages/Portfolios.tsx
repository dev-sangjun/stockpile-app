import DistributionChart from "../components/common/DistributionChart";
import PortfoliosOverview from "../components/desktop/PortfoliosOverview";

const Portfolios = () => {
  return (
    <div className="w-full grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-4">
        <PortfoliosOverview />
        <DistributionChart />
      </div>
      <div className="cols-2 h-32 bg-slate-100" />
    </div>
  );
};

export default Portfolios;
