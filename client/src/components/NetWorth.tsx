import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../states/store";
import { getInvestments, getStocks } from "../states/user.reducer";
import { getTotalNetWorth } from "../utils/entity.utils";
import { toUSD } from "../utils/common.utils";

const NetWorth: FC = () => {
  const investments = useSelector((state: RootState) => getInvestments(state));
  const stocks = useSelector((state: RootState) => getStocks(state));
  return (
    <div className="flex flex-col h-full">
      <h3 className="text-lg font-semibold">Net Worth</h3>
      <div className="flex-1 flex flex-row items-center">
        <span className="text-2xl font-bold text-primary">
          {toUSD(getTotalNetWorth(Object.values(investments), stocks))}
        </span>
      </div>
    </div>
  );
};

export default NetWorth;
