import { FC } from "react";

const AddInvestmentForm: FC = () => {
  return (
    <form className="flex flex-col gap-2">
      <input
        type="text"
        placeholder="Symbol / Ticker"
        className="input input-sm input-bordered w-full max-w-xs"
      />
      <input
        type="number"
        placeholder="Qty"
        min={1}
        className="input input-sm input-bordered w-full max-w-xs"
      />
      <button className="btn btn-sm btn-primary">Submit</button>
    </form>
  );
};

export default AddInvestmentForm;
