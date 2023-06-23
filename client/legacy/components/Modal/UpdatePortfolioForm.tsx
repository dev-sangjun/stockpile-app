import { FC, FormEvent, useState } from "react";
import { Portfolio } from "../../types/entity.types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../states/store";
import { closeModal } from "../../states/modal.reducer";
import isEmpty from "is-empty";
import { updatePortfolio } from "../../api/portfolio.api";
import { notify } from "../../utils/toast.utils";
import { asyncFetchUser } from "../../states/user.reducer";

interface UpdatePortfolioFormProps {
  portfolio: Portfolio;
}

const UpdatePortfolioForm: FC<UpdatePortfolioFormProps> = ({ portfolio }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [newPortfolioName, setNewPortfolioName] = useState("");
  const isNewPortfolioNameValid =
    !isEmpty(newPortfolioName) && newPortfolioName !== portfolio.name;
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isNewPortfolioNameValid) {
      return;
    }
    try {
      const res = await updatePortfolio(portfolio.id, newPortfolioName);
      if (!res.success) {
        throw new Error("Something went wrong!");
      }
      notify("Successfully updated portfolio");
      await dispatch(asyncFetchUser());
      dispatch(closeModal());
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <form className="modal-box flex flex-col gap-2" onSubmit={handleSubmit}>
      <h3 className="font-bold text-lg">Update Portfolio</h3>
      <input
        name="name"
        className="input input-sm input-bordered w-full"
        placeholder="New portfolio name"
        onChange={e => setNewPortfolioName(e.currentTarget.value)}
        value={newPortfolioName}
      />
      <p>Are you sure you want to update {portfolio.name}?</p>
      <div className="modal-action mt-0">
        <button
          className="btn btn-ghost btn-sm normal-case"
          type="button"
          onClick={() => dispatch(closeModal())}
        >
          Cancel
        </button>
        <button
          className="btn btn-primary btn-sm normal-case"
          type="submit"
          disabled={!isNewPortfolioNameValid}
        >
          Confirm
        </button>
      </div>
    </form>
  );
};

export default UpdatePortfolioForm;
