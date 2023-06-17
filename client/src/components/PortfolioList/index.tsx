import { FC } from "react";
import isEmpty from "is-empty";
import PortfolioListItem from "./PortfolioListItem";
import { useSelector } from "react-redux";
import { RootState } from "../../states/store";
import AddPortfolio from "./AddPortfolio";
import { getPortfolios, getSelectedPortfolio } from "../../states/user.reducer";
import Fallback from "../Fallback";
import InvestmentList from "../InvestmentList";

interface PortfolioListProps {
  className?: string;
}

const PortfolioList: FC<PortfolioListProps> = ({ className }) => {
  const portfolios = useSelector((state: RootState) => getPortfolios(state));
  const selectedPortfolio = useSelector((state: RootState) =>
    getSelectedPortfolio(state)
  );
  const renderPortfolios = () => {
    if (isEmpty(portfolios)) {
      return <Fallback message="Please add your portfolio." />;
    }
    return portfolios.map(portfolio => (
      <PortfolioListItem key={portfolio.id} portfolio={portfolio} />
    ));
  };
  const getActionButtons = () => (
    <div className="flex items-center gap-2">
      <AddPortfolio />
    </div>
  );
  if (selectedPortfolio) {
    return <InvestmentList />;
  }
  return (
    <div className={`flex flex-col gap-4 ${className ? className : ""}`}>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Portfolios</h2>
        {getActionButtons()}
      </div>
      <ul className="flex flex-col gap-4">{renderPortfolios()}</ul>
    </div>
  );
};

export default PortfolioList;
