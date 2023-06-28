import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { RootState } from "../store";
import { toUSD } from "../utils/common.utils";
import { getUser } from "../store/user.reducer";

const GoalProgress = () => {
  const { t } = useTranslation();
  const { investments, goalAmount, stocks } = useSelector((state: RootState) =>
    getUser(state)
  );
  const getTotalNetWorth = () =>
    Object.values(investments).reduce((prev, investment) => {
      const { quantity, stockId } = investment;
      return prev + (stocks?.[stockId]?.c || 0) * quantity;
    }, 0);
  const percentage = (getTotalNetWorth() / goalAmount) * 100;
  return (
    <div className="flex flex-col h-full gap-2 md:gap-4">
      <h3 className="md:text-lg font-semibold">{t("Goal Progress")}</h3>
      <progress
        className="progress progress-primary w-full"
        value={percentage}
        max="100"
      />
      <div className="flex justify-between font-medium">
        <h4>{t("Progress")}</h4>
        <span className="text-primary font-bold">{percentage.toFixed(2)}%</span>
      </div>
      <div className="flex justify-between font-medium">
        <h4>{t("Current")}</h4>
        <span className="font-bold">{toUSD(getTotalNetWorth(), false)}</span>
      </div>
      <div className="flex justify-between font-medium">
        <h4>{t("Goal")}</h4>
        <span className="font-bold">{toUSD(goalAmount, false)}</span>
      </div>
    </div>
  );
};

export default GoalProgress;
