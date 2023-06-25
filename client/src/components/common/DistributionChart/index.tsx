import { useSelector } from "react-redux";
import isEmpty from "is-empty";
import { Chart as ChartJS, Tooltip, ArcElement } from "chart.js";
import { RootState } from "../../../store";
import { getUser } from "../../../store/user.reducer";
import Fallback from "../Fallback";
import PieChart from "./PieChart";

ChartJS.register(ArcElement, Tooltip);

const DistributionChart = () => {
  const { investments } = useSelector((state: RootState) => getUser(state));
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-semibold">Distribution</h2>
      {isEmpty(investments) ? (
        <Fallback message="No portfolio to display 🥲" />
      ) : (
        <div className="card h-full bg-slate-100 p-6">
          <PieChart investments={Object.values(investments)} />
        </div>
      )}
    </div>
  );
};

export default DistributionChart;
