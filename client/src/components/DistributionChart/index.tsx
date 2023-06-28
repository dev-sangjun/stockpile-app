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
        <div className="card justify-center h-64 md:h-96 bg-slate-100 p-6">
          <PieChart investments={Object.values(investments)} />
        </div>
      )}
    </Section>
  );
};

export default DistributionChart;
