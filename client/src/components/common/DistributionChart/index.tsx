import { useSelector } from "react-redux";
import isEmpty from "is-empty";
import { Chart as ChartJS, Tooltip, ArcElement } from "chart.js";
import { RootState } from "../../../store";
import { getUser } from "../../../store/user.reducer";
import Fallback from "../Fallback";
import PieChart from "./PieChart";
import Section from "../Section";
import emojis from "../../../constants/emoji.constants";

ChartJS.register(ArcElement, Tooltip);

const DistributionChart = () => {
  const { investments } = useSelector((state: RootState) => getUser(state));
  return (
    <Section title="Distribution">
      {isEmpty(investments) ? (
        <Fallback
          className="h-96"
          message={`Hmm... There is no investment to display. ${emojis.ponder}`}
        />
      ) : (
        <div className="card justify-center h-96 bg-slate-100 p-6">
          <PieChart investments={Object.values(investments)} />
        </div>
      )}
    </Section>
  );
};

export default DistributionChart;
