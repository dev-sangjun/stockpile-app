import { FC } from "react";
import PortfolioListItem from "./PortfolioListItem";
import { useSelector } from "react-redux";
import { RootState } from "../../states/store";
import AddPortfolio from "../AddPortfolio";
import { getPortfolios } from "../../states/user.reducer";

const PortfolioList: FC = () => {
  const portfolios = useSelector((state: RootState) => getPortfolios(state));
  const renderPortfolios = () => {
    return portfolios.map(portfolio => (
      <PortfolioListItem key={portfolio.id} portfolio={portfolio} />
    ));
  };
  const getActionButtons = () => (
    <div className="flex items-center gap-2">
      <AddPortfolio />
    </div>
  );
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Portfolios</h2>
        {getActionButtons()}
      </div>
      <ul className="flex flex-col gap-4">{renderPortfolios()}</ul>
    </div>
  );
};

export default PortfolioList;
