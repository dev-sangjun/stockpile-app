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
  return <ul className="flex flex-col gap-4">{renderPortfolios()}</ul>;
};

export default PortfolioList;
