import { useEffect } from "react";
import useDispatchActions from "../hooks/useDispatchActions";
import DistributionChart from "../components/DistributionChart";
import PortfolioList from "../components/PortfolioList";
import PortfoliosOverview from "../components/PortfoliosOverview";
import PortfolioDetails from "../components/PortfolioDetails";
import InvestmentList from "../components/InvestmentList";
import InvestmentDetails from "../components/InvestmentDetails";
import { useSelectedEntity } from "../hooks";

const Portfolios = () => {
  const { portfolioActions, investmentActions } = useDispatchActions();
  const { selectedPortfolio, selectedInvestment } = useSelectedEntity();
  useEffect(() => {
    const reset = () => {
      portfolioActions.deselect();
      investmentActions.deselect();
    };
    return reset;
  }, [portfolioActions, investmentActions]);
  return (
    <div className="w-full p-2 flex flex-col md:grid md:grid-cols-2 md:grid-rows-[39rem] gap-4 overflow-hidden">
      <div
        className={`${
          selectedPortfolio ? "hidden" : "flex"
        } md:flex flex-col gap-4 `}
      >
        <PortfoliosOverview />
        <DistributionChart />
      </div>
      <div className="flex flex-col gap-4 overflow-hidden">
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
