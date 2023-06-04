import { HiBuildingOffice2 } from "react-icons/hi2";
import { Stocks } from "../../states/stocks.reducer";
import { Investment } from "../../types/entity.types";

export const renderCompanyLogo = (investment: Investment, stocks: Stocks) => {
  const logoUrl = stocks?.[investment.stockId]?.company?.logo;
  return logoUrl ? (
    <div className="rounded-xl overflow-hidden w-10 shadow-xl">
      <img
        src={logoUrl}
        alt={stocks?.[investment.stockId]?.company?.name || "company"}
      />
    </div>
  ) : (
    <div className="flex justify-center items-center rounded-xl w-10 h-10 text-xl shadow-xl bg-slate-500 text-base-100">
      <HiBuildingOffice2 />
    </div>
  );
};
