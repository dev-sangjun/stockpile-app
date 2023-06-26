import { FC } from "react";
import { useSelector } from "react-redux";
import {
  getGoalAmount,
  getInvestments,
  getStocks,
} from "../states/user.reducer";
import { RootState } from "../states/store";
import { toUSD } from "../utils/common.utils";

const GoalProgress: FC = () => {
  const investments = useSelector((state: RootState) => getInvestments(state));
  const stocks = useSelector((state: RootState) => getStocks(state));
  const getTotalNetWorth = () =>
    Object.values(investments).reduce((prev, investment) => {
      const { quantity, stockId } = investment;
      return prev + (stocks?.[stockId]?.c || 0) * quantity;
    }, 0);
  const goalAmount = useSelector((state: RootState) => getGoalAmount(state));
  const percentage = (getTotalNetWorth() / goalAmount) * 100;
  return (
    <div className="flex flex-col h-full gap-4">
      <h3 className="text-lg font-semibold">Goal Progress</h3>
      <progress
        className="progress progress-primary w-full"
        value={percentage}
        max="100"
      />
      <div className="flex justify-between font-medium">
        <h4>Progress</h4>
        <span className="text-primary font-bold">{percentage.toFixed(2)}%</span>
      </div>
      <div className="flex justify-between font-medium">
        <h4>Current</h4>
        <span className="font-bold">{toUSD(getTotalNetWorth(), false)}</span>
      </div>
      <div className="flex justify-between font-medium">
        <h4>Goal</h4>
        <span className="font-bold">{toUSD(goalAmount, false)}</span>
      </div>
    </div>
  );
};

export default GoalProgress;