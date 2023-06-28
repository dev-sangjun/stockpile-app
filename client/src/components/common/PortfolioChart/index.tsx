import { useSelector } from "react-redux";
import isEmpty from "is-empty";
import BarChart from "./BarChart";
import { getUser } from "../../../store/user.reducer";
import { RootState } from "../../../store";
import Fallback from "../Fallback";
import { fallbackMessages } from "../../../constants/messages.constants";

const PortfolioChart = () => {
  const { portfolios } = useSelector((state: RootState) => getUser(state));
  return (
    <div className="card h-full bg-slate-100 p-6">
      <h3 className="text-lg font-semibold">Portfolio Values</h3>
      {isEmpty(portfolios) ? (
        <Fallback message={fallbackMessages.portfolioValues} />
      ) : (
        <BarChart portfolios={portfolios} />
      )}
    </div>
  );
};

export default PortfolioChart;
