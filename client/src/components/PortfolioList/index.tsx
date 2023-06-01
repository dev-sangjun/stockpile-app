import { FC } from "react";
import { useFetchPortfolios } from "../../utils/api.utils";
import PortfolioListItem from "./PortfolioListItem";

const PortfolioList: FC = () => {
  const [portfolios] = useFetchPortfolios();
  const renderPortfolios = () => {
    return portfolios.map(portfolio => (
      <PortfolioListItem key={portfolio.id} portfolio={portfolio} />
    ));
  };
  return <ul>{renderPortfolios()}</ul>;
};

export default PortfolioList;
