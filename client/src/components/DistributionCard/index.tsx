import { FC } from "react";
import { useSelector } from "react-redux";
import isEmpty from "is-empty";
import { RootState } from "../../states/store";
import { getInvestments } from "../../states/user.reducer";
import DistributionChart from "./DistributionChart";
import Fallback from "../Fallback";

const DistributionCard: FC = () => {
  const investments = useSelector((state: RootState) => getInvestments(state));
  return (
    <div className="card flex flex-col bg-base-100 gap-2">
      <h3 className="text-lg font-bold">Stock Distribution</h3>
      <div className="flex-1">
        {isEmpty(investments) ? (
          <Fallback message="No investment to display 🥲" />
        ) : (
          <DistributionChart investments={Object.values(investments)} />
        )}
      </div>
    </div>
  );
};

export default DistributionCard;
