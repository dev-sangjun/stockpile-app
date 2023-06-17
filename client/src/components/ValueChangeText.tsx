import { FC } from "react";
import { HiArrowDown, HiArrowUp } from "react-icons/hi2";
import { toUSD } from "../utils/common.utils";

interface ValueChangeTextProps {
  value: number;
  usePercentage?: boolean;
}

const getGainLossTextColor = (value: number) => {
  if (value > 0) {
    return "text-green-500";
  } else if (value < 0) {
    return "text-red-500";
  }
  return "text-slate-400";
};

const renderDayChangeArrow = (value: number) => {
  if (value > 0) {
    return <HiArrowUp />;
  } else if (value < 0) {
    return <HiArrowDown />;
  }
  return null;
};

const ValueChangeText: FC<ValueChangeTextProps> = ({
  value,
  usePercentage = false,
}) => {
  return (
    <div className={`flex items-center ${getGainLossTextColor(value)}`}>
      <span>
        {value > 0 && "+"}
        {usePercentage ? `${value}%` : toUSD(value)}
      </span>
      {renderDayChangeArrow(value)}
    </div>
  );
};

export default ValueChangeText;
