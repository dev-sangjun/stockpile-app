import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../states/store";
import { getInvestments } from "../../states/user.reducer";
import DistributionChart from "./DistributionChart";

const DistributionCard: FC = () => {
  const investments = useSelector((state: RootState) => getInvestments(state));
  return (
    <div className="card flex flex-col h-full bg-base-100 p-4 gap-2">
      <h3 className="text-lg font-bold">Stock Distribution</h3>
      <div className="flex-1">
        <DistributionChart investments={Object.values(investments)} />
      </div>
    </div>
  );
};

export default DistributionCard;
