import { HiBuildingOffice2 } from "react-icons/hi2";
import isEmpty from "is-empty";
import { Investment } from "../../types/entity.types";
import InvestmentListItem from "./InvestmentListItem";
import Fallback from "../Fallback";

export const renderInvestmentListItems = (
  investments: Investment[],
  favoriteStocks: string[],
  showActionButtons = false
) => {
  if (isEmpty(investments)) {
    return <Fallback message="Please add your investment." />;
  }
  const isFavorite = (investmentId: string) =>
    favoriteStocks.includes(investmentId);
  return investments.map(investment => (
    <InvestmentListItem
      key={investment.id}
      investment={investment}
      isFavorite={isFavorite(investment.stockId)}
      showActionButtons={showActionButtons}
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
