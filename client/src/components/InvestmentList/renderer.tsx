import { HiBuildingOffice2 } from "react-icons/hi2";
import { Investment } from "../../types/entity.types";
import InvestmentListItem from "./InvestmentListItem";

export const renderInvestmentListItems = (
  investments: Investment[],
  favoriteStocks: string[]
) => {
  const isFavorite = (investmentId: string) =>
    favoriteStocks.includes(investmentId);
  return investments.map(investment => (
    <InvestmentListItem
      key={investment.id}
      investment={investment}
      isFavorite={isFavorite(investment.stockId)}
    />
  ));
};

export const renderCompanyLogo = (logoUrl: string) => {
  return logoUrl ? (
    <div className="rounded-xl overflow-hidden w-10 shadow-xl">
      <img src="" alt={"logo"} />
    </div>
  ) : (
    <div className="flex justify-center items-center rounded-xl w-10 h-10 text-xl shadow-xl bg-slate-500 text-base-100">
      <HiBuildingOffice2 />
    </div>
  );
};
