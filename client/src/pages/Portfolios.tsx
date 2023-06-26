import DistributionChart from "../components/common/DistributionChart";
import PortfolioList from "../components/desktop/PortfolioList";
import PortfoliosOverview from "../components/desktop/PortfoliosOverview";
import PortfolioDetails from "../components/desktop/PortfolioDetails";
import InvestmentList from "../components/desktop/InvestmentList";
import InvestmentDetails from "../components/desktop/InvestmentDetails";
import { useSelectedEntity } from "../hooks";

const Portfolios = () => {
  const { selectedPortfolio, selectedInvestment } = useSelectedEntity();
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
            {selectedInvestment ? (
              <InvestmentDetails investment={selectedInvestment} />
            ) : (
              <InvestmentList portfolio={selectedPortfolio} />
            )}
          </>
        ) : (
          <PortfolioList />
        )}
      </div>
    </div>
  );
};

export default Portfolios;
