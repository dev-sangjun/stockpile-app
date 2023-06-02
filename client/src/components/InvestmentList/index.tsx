import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../states/store";
import InvestmentListItem from "./InvestmentListItem";
import { getInvestments } from "../../states/investments.reducer";

const InvestmentList: FC = () => {
  const investments = useSelector((state: RootState) => getInvestments(state));
  const renderInvestments = () => {
    return Object.values(investments).map(investment => (
      <InvestmentListItem key={investment.id} investment={investment} />
    ));
  };
  return <ul className="flex flex-col gap-4">{renderInvestments()}</ul>;
};

export default InvestmentList;
