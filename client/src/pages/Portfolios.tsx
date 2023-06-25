import { useSelector } from "react-redux";
import { RootState } from "../store";
import { getEntity } from "../store/entity.reducer";
import DistributionChart from "../components/common/DistributionChart";
import PortfolioList from "../components/desktop/PortfolioList";
import PortfoliosOverview from "../components/desktop/PortfoliosOverview";
import PortfolioDetails from "../components/desktop/PortfolioDetails";
import InvestmentList from "../components/desktop/InvestmentList";

const Portfolios = () => {
  const { selectedPortfolio } = useSelector((state: RootState) =>
    getEntity(state)
  );
  return (
    <div className="w-full grid grid-cols-2 grid-rows-[39rem] gap-4">
      <div className="flex flex-col gap-4">
        <PortfoliosOverview />
        <DistributionChart />
      </div>
      <div className="h-full flex flex-col gap-4">
        {selectedPortfolio ? (
          <>
            <PortfolioDetails portfolio={selectedPortfolio} />
            <InvestmentList portfolio={selectedPortfolio} />
          </>
        ) : (
          <PortfolioList />
        )}
      </div>
    </div>
  );
};

export default Portfolios;
