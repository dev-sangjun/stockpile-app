import { FC } from "react";
import { Portfolio } from "../../types/entity.types";

interface PortfolioListItemProps {
  portfolio: Portfolio;
}

const PortfolioListItem: FC<PortfolioListItemProps> = ({ portfolio }) => {
  return <li>{portfolio.name}</li>;
};

export default PortfolioListItem;
