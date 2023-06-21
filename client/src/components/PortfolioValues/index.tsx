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
    <div className="card h-full bg-slate-100 p-6">
      <h3 className="text-lg font-semibold">Portfolio Values</h3>
      {isEmpty(portfolios) ? (
        <Fallback message="No portfolio to display 🥲" />
      ) : (
        <PortfolioChart portfolios={portfolios} />
      )}
    </div>
  );
};

export default PortfolioValues;
