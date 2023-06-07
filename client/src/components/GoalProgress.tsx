import { CSSProperties, FC } from "react";
import { useSelector } from "react-redux";
import { getInvestments, getStocks } from "../states/user.reducer";
import { RootState } from "../states/store";

const GoalProgress: FC = props => {
  const investments = useSelector((state: RootState) => getInvestments(state));
  const stocks = useSelector((state: RootState) => getStocks(state));
  const getTotalNetWorth = () =>
    Object.values(investments).reduce((prev, investment) => {
      const { quantity, stockId } = investment;
      return prev + (stocks?.[stockId]?.c || 0) * quantity;
    }, 0);
  const goal = 100000; // TODO: replace with user's goal
  const percentage = (getTotalNetWorth() / goal) * 100;
  const style = {
    "--value": percentage,
    "--thickness": "1rem",
  } as CSSProperties;
  return (
    <div className="flex flex-col h-full gap-2">
      <h3 className="text-lg font-bold">Goal Progress</h3>
      <div
        className="radial-progress mx-auto bg-slate-200 text-primary font-bold border-4 border-slate-200"
        style={style}
      >
        {percentage.toFixed(2)}%
      </div>
    </div>
  );
};

export default GoalProgress;
