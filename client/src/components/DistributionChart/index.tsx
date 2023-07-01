import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import isEmpty from "is-empty";
import { Chart as ChartJS, Tooltip, ArcElement } from "chart.js";
import { RootState } from "../../store";
import { getUser } from "../../store/user.reducer";
import Fallback from "../Fallback";
import PieChart from "./PieChart";
import Section from "../Section";
import { useFallbackMessages } from "../../constants/messages.constants";

ChartJS.register(ArcElement, Tooltip);

const DistributionChart = () => {
  const { t } = useTranslation();
  const fallbackMessages = useFallbackMessages();
  const { investments } = useSelector((state: RootState) => getUser(state));
  return (
    <Section title={t("Distribution")}>
      {isEmpty(investments) ? (
        <Fallback className="md:h-96" message={fallbackMessages.investments} />
      ) : (
        <div className="card bg-slate-100">
          <div className="flex h-[25vh] min-h-[180px] items-center md:hidden p-4">
            <PieChart
              responsive={false}
              investments={Object.values(investments)}
            />
          </div>
          <div className="hidden md:block h-96 p-6">
            <PieChart investments={Object.values(investments)} />
          </div>
        </div>
      )}
    </Section>
  );
};

export default DistributionChart;
