import { FC, ReactNode } from "react";
// import { renderCompanyLogo } from "../InvestmentList/renderer";
import { InvestmentDetails, PortfolioDetails } from "../../utils/entity.utils";
import {
  renderFavoriteStockGridItems,
  renderInvestmentGridItems,
  renderPortfolioGridItems,
} from "../EntityListGridItem/renderer";
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
  // logoUrl,
  title,
  actionButtons,
  // valueLabel,
  entityDetails,
  // onClick,
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
  // const getValue = () => {
  //   if (entityType === "Portfolio") {
  //     return (entityDetails as PortfolioDetails).totalValue;
  //   }
  //   if (entityType === "Investment") {
  //     return (entityDetails as InvestmentDetails).curPrice;
  //   }
  //   if (entityType === "FavoriteStock") {
  //     const { stock } = entityDetails as FavoriteStockDetails;
  //     return stock.c;
  //   }
  //   return 0;
  // };
  return (
    <div
      className={`collapse collapse-plus bg-base-100 min-w-[16rem] md:max-w-[18rem] ${className}`}
    >
      <input type="checkbox" />
      <div className="collapse-title">
        <h3 className="text-md font-bold">{title}</h3>
      </div>
      <div className="collapse-content flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-2">{getEntityGridItems()}</div>
        <div className="flex justify-around">{actionButtons}</div>
      </div>
    </div>
  );
};

export default EntityListItem;
