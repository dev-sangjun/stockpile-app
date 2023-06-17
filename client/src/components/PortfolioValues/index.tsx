import { FC } from "react";
import isEmpty from "is-empty";
import PortfolioChart from "./PortfolioChart";
import { useSelector } from "react-redux";
import { RootState } from "../../states/store";
import { getPortfolios } from "../../states/user.reducer";
import Fallback from "../Fallback";

const PortfolioValues: FC = () => {
  const portfolios = useSelector((state: RootState) => getPortfolios(state));
  return (
    <div className="flex flex-row h-full bg-base-100 px-4 gap-2">
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

export default PortfolioValues;
