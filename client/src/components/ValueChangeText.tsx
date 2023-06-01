import { FC } from "react";
import { toUSD } from "../utils/numeral.utils";
import { HiArrowDown, HiArrowUp } from "react-icons/hi2";

interface ValueChangeTextProps {
  value: number;
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

const ValueChangeText: FC<ValueChangeTextProps> = ({ value }) => {
  return (
    <div className={`flex items-center ${getGainLossTextColor(value)}`}>
      <span>
        {value > 0 && "+"}
        {toUSD(value)}
      </span>
      {renderDayChangeArrow(value)}
    </div>
  );
};

export default ValueChangeText;
