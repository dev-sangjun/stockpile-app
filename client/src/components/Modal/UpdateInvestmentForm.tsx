import { FC } from "react";
import { Investment } from "../../types/entity.types";
import InvestmentForm from "../InvestmentForm";

interface UpdateInvestmentFormProps {
  investment: Investment;
}

const UpdateInvestmentForm: FC<UpdateInvestmentFormProps> = ({
  investment,
}) => {
  return (
    <InvestmentForm
      className="modal-box"
      title="Update Investment"
      actionType="UPDATE"
      isModal
      investment={investment}
    />
  );
};

export default UpdateInvestmentForm;
