import { FC } from "react";
import { toDecimal, toUSD } from "../../utils/common.utils";

interface ValueChangeTextProps {
  prevValue: number;
  curValue: number;
}

const getGainLossTextColor = (value: number) => {
  if (value > 0) {
    return "text-green-500";
  } else if (value < 0) {
    return "text-red-500";
  }
  return "text-slate-400";
};

const ValueChangeText: FC<ValueChangeTextProps> = ({ prevValue, curValue }) => {
  const change = toDecimal(curValue - prevValue);
  const changeInPercentage = toDecimal(
    ((curValue - prevValue) / prevValue) * 100
  );
  return (
    <div className={`flex items-center ${getGainLossTextColor(change)}`}>
      <span>
        {change > 0 && "+"}
        {toUSD(change)} ({Math.abs(changeInPercentage)}%)
      </span>
    </div>
  );
};

export default ValueChangeText;
