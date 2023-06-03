import { FC } from "react";
import PortfolioListItem from "./PortfolioListItem";
import { useSelector } from "react-redux";
import { RootState } from "../../states/store";
import { getPortfolios } from "../../states/portfolios.reducer";

const PortfolioList: FC = () => {
  const portfolios = useSelector((state: RootState) => getPortfolios(state));
  const renderPortfolios = () => {
    return portfolios.map(portfolio => (
      <PortfolioListItem key={portfolio.id} portfolio={portfolio} />
    ));
  };
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Portfolios</h2>
      <ul className="flex flex-col gap-4">{renderPortfolios()}</ul>
    </div>
  );
};

export default PortfolioList;
