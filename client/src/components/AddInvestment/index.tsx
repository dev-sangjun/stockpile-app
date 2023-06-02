import { FC } from "react";
import AddInvestmentForm from "./AddInvestmentForm";

const AddInvestment: FC = () => {
  return (
    <div className="dropdown dropdown-bottom dropdown-end top-[-1px]">
      <label tabIndex={0} className="btn btn-xs">
        Add Investment
      </label>
      <div
        tabIndex={0}
        className="dropdown-content p-2 shadow-xl bg-base-100 rounded-box w-52 mt-2"
      >
        <AddInvestmentForm />
      </div>
    </div>
  );
};

export default AddInvestment;
