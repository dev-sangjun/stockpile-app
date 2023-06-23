import { FC } from "react";
import TotalInvested from "./TotalInvested";
import { useSelector } from "react-redux";
import { RootState } from "../../states/store";
import { getInvestments, getStocks } from "../../states/user.reducer";
import AllInvestments from "./AllInvestments";

interface PortfolioOverviewProps {
  className?: string;
}

const PortfolioOverview: FC<PortfolioOverviewProps> = ({ className }) => {
  const investments = useSelector((state: RootState) => getInvestments(state));
  const stocks = useSelector((state: RootState) => getStocks(state));
  return (
    <div className={`flex flex-col gap-4 ${className ? className : ""}`}>
      <TotalInvested investments={Object.values(investments)} stocks={stocks} />
      <AllInvestments investments={Object.values(investments)} />
    </div>
  );
};

export default PortfolioOverview;
