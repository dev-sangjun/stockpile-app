import { useSelector } from "react-redux";
import isEmpty from "is-empty";
import { Chart as ChartJS, Tooltip, ArcElement } from "chart.js";
import { RootState } from "../../../store";
import { getUser } from "../../../store/user.reducer";
import Fallback from "../Fallback";
import PieChart from "./PieChart";
import Section from "../Section";

ChartJS.register(ArcElement, Tooltip);

const DistributionChart = () => {
  const { investments } = useSelector((state: RootState) => getUser(state));
  return (
    <Section title="Distribution">
      {isEmpty(investments) ? (
        <Fallback message="No portfolio to display 🥲" />
      ) : (
        <div className="card justify-center h-[24rem] bg-slate-100 p-6">
          <PieChart investments={Object.values(investments)} />
        </div>
      )}
    </Section>
  );
};

export default DistributionChart;
