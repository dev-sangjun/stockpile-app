import { FC } from "react";

const UpdatePortfolioForm: FC = () => {
  return (
    <div>
      <input
        name="name"
        className="input input-sm input-bordered w-full max-w-xs"
        placeholder="New portfolio name"
      />
    </div>
  );
};

export default UpdatePortfolioForm;
