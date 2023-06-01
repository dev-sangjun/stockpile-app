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
  return <ul className="flex flex-col gap-4">{renderPortfolios()}</ul>;
};

export default PortfolioList;
