import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import isEmpty from "is-empty";
import BarChart from "./BarChart";
import { getUser } from "../../store/user.reducer";
import { RootState } from "../../store";
import Fallback from "../Fallback";
import { useFallbackMessages } from "../../constants/messages.constants";

const PortfolioChart = () => {
  const { t } = useTranslation();
  const fallbackMessages = useFallbackMessages();
  const { portfolios } = useSelector((state: RootState) => getUser(state));
  return (
    <div className="card h-full bg-slate-100 p-4 md:p-6 gap-4">
      <h3 className="md:text-lg font-semibold">{t("Portfolio Values")}</h3>
      {isEmpty(portfolios) ? (
        <Fallback
          className="h-full"
          message={fallbackMessages.portfolioValues}
        />
      ) : (
        <BarChart portfolios={portfolios} />
      )}
    </div>
  );
};

export default PortfolioChart;
