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
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">All Investments</h2>
      <ul className="flex flex-col gap-4">
        {renderInvestmentListItems(investments, favoriteStocks)}
      </ul>
    </div>
  );
};

export default AllInvestments;
