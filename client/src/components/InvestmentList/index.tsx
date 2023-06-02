import { FC } from "react";
import InvestmentListItem from "./InvestmentListItem";
import { Investment } from "../../types/entity.types";

interface InvestmentListProps {
  investments: Investment[];
}

const InvestmentList: FC<InvestmentListProps> = ({ investments }) => {
  const renderInvestments = () => {
    return Object.values(investments).map(investment => (
      <InvestmentListItem key={investment.id} investment={investment} />
    ));
  };
  return <ul className="flex flex-col gap-4">{renderInvestments()}</ul>;
};

export default InvestmentList;
