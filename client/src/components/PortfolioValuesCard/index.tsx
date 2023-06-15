import { FC } from "react";
import isEmpty from "is-empty";
import PortfolioChart from "./PortfolioChart";
import { useSelector } from "react-redux";
import { RootState } from "../../states/store";
import { getPortfolios } from "../../states/user.reducer";
import Fallback from "../Fallback";

const PortfolioValuesCard: FC = () => {
  const portfolios = useSelector((state: RootState) => getPortfolios(state));
  return (
    <div className="card flex flex-row h-full bg-base-100 p-4 gap-2">
      <div className="flex flex-1 flex-col h-full text-lg font-bold overflow-hidden">
        <h3 className="text-lg font-bold">Portfolio Values</h3>
        {isEmpty(portfolios) ? (
          <Fallback message="No portfolio to display 🥲" />
        ) : (
          <PortfolioChart portfolios={portfolios} />
        )}
      </div>
    </div>
  );
};

export default PortfolioValuesCard;
