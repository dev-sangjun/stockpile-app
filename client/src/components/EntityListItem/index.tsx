import { FC, ReactNode } from "react";
import { renderCompanyLogo } from "../InvestmentList/renderer";
import { InvestmentDetails, PortfolioDetails } from "../../utils/entity.utils";
import {
  renderFavoriteStockGridItems,
  renderInvestmentGridItems,
  renderPortfolioGridItems,
} from "../EntityListGridItem/renderer";
import { toUSD } from "../../utils/numeral.utils";
import { Stock } from "../../types/entity.types";

interface FavoriteStockDetails {
  stock: Stock;
  quantity: number;
}

interface EntityListItemProps {
  className?: string;
  entityType: "Portfolio" | "Investment" | "FavoriteStock";
  logoUrl?: string;
  title: string;
  actionButtons: ReactNode;
  valueLabel: string;
  entityDetails: PortfolioDetails | InvestmentDetails | FavoriteStockDetails;
  onClick?: () => void;
}

const EntityListItem: FC<EntityListItemProps> = ({
  className,
  entityType,
  logoUrl,
  title,
  actionButtons,
  valueLabel,
  entityDetails,
  onClick,
}) => {
  const getEntityGridItems = () => {
    if (entityType === "Portfolio") {
      return renderPortfolioGridItems(entityDetails as PortfolioDetails);
    }
    if (entityType === "Investment") {
      return renderInvestmentGridItems(entityDetails as InvestmentDetails);
    }
    if (entityType === "FavoriteStock") {
      const { stock, quantity } = entityDetails as FavoriteStockDetails;
      return renderFavoriteStockGridItems(stock, quantity);
    }
    return null;
  };
  const getValue = () => {
    if (entityType === "Portfolio") {
      return (entityDetails as PortfolioDetails).totalValue;
    }
    if (entityType === "Investment") {
      return (entityDetails as InvestmentDetails).curPrice;
    }
    if (entityType === "FavoriteStock") {
      const { stock } = entityDetails as FavoriteStockDetails;
      return stock.c;
    }
    return 0;
  };
  return (
    <li
      className={`card bg-base-100 p-4 flex flex-col gap-4 ${
        className ? className : ""
      } ${onClick ? "hover:cursor-pointer" : ""}`}
      onClick={onClick}
    >
      <div className="flex items-center h-30 gap-2">
        <div className="flex flex-1 items-center gap-2">
          {/* {logoUrl && renderCompanyLogo(logoUrl)} */}
          <h3 className="text-lg font-bold">{title}</h3>
          {actionButtons}
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-slate-400">{valueLabel}</span>
          <span className="font-bold text-lg">{toUSD(getValue())}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">{getEntityGridItems()}</div>
    </li>
  );
};

export default EntityListItem;
