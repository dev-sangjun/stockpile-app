import { FC } from "react";
import { renderInvestmentListItems } from "../InvestmentList/renderer";
import { Investment } from "../../types/entity.types";
import { getFavoriteStocks } from "../../states/user.reducer";
import { useSelector } from "react-redux";
import { RootState } from "../../states/store";

interface AllInvestmentsProps {
  investments: Investment[];
}

const AllInvestments: FC<AllInvestmentsProps> = ({ investments }) => {
  const favoriteStocks = useSelector((state: RootState) =>
    getFavoriteStocks(state)
  );
  return (
    <div className="flex flex-col relative card border overflow-hidden">
      <h2 className="text-lg font-semibold p-4 bg-slate-100">
        All Investments ({investments.length})
      </h2>
      <ul className="gap-4 max-h-[18rem] overflow-y-auto no-scrollbar snap-y">
        {renderInvestmentListItems(investments, favoriteStocks)}
      </ul>
    </div>
  );
};

export default AllInvestments;
