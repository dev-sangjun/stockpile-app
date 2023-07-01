import DistributionChart from "../components/DistributionChart";
import PortfolioList from "../components/PortfolioList";
import PortfoliosOverview from "../components/PortfoliosOverview";
import PortfolioDetails from "../components/PortfolioDetails";
import InvestmentList from "../components/InvestmentList";
import InvestmentDetails from "../components/InvestmentDetails";
import { useSelectedEntity } from "../hooks";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { deselectInvestment, deselectPortfolio } from "../store/entity.reducer";

const Portfolios = () => {
  const dispatch = useDispatch();
  const { selectedPortfolio, selectedInvestment } = useSelectedEntity();
  useEffect(() => {
    const reset = () => {
      dispatch(deselectPortfolio());
      dispatch(deselectInvestment());
    };
    return reset;
  }, [dispatch]);
  return (
    <div className="w-full h-full p-4 flex flex-col md:grid md:grid-cols-2 md:grid-rows-[39rem] gap-4 overflow-hidden">
      <div
        className={`${
          selectedPortfolio ? "hidden md:flex" : "flex"
        } flex-col gap-4`}
      >
        <PortfoliosOverview />
        <DistributionChart />
      </div>
      <div className="flex flex-col gap-4 h-full overflow-hidden">
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
