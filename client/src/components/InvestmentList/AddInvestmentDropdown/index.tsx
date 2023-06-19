import { FC } from "react";
import { HiPlus } from "react-icons/hi2";
import InvestmentForm from "../../InvestmentForm";

const AddInvestmentDropdown: FC = () => {
  return (
    <div className="dropdown dropdown-bottom dropdown-start">
      <label tabIndex={0} className="btn btn-sm btn-ghost">
        <HiPlus />
      </label>
      <div
        tabIndex={0}
        className="dropdown-content p-2 shadow-xl bg-base-100 rounded-box w-52 mt-2 z-50"
      >
        <InvestmentForm actionType="ADD" titleLabel="Add investment" />
      </div>
    </div>
  );
};

export default AddInvestmentDropdown;
