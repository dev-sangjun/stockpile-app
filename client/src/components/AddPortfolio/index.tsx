import { FC } from "react";
import isEmpty from "is-empty";
import { useOutsideClick } from "../../hooks";
import useAddPortfolioForm from "./useAddPortfolioForm";

const AddPortfolio: FC = () => {
  const { formData, resetFormData, handleFormChange, handleSubmit } =
    useAddPortfolioForm();
  const formRef = useOutsideClick<HTMLFormElement>(resetFormData);
  return (
    <div className="dropdown dropdown-bottom dropdown-end top-[-1px]">
      <label tabIndex={0} className="btn btn-xs btn-outline">
        Add Portfolio
      </label>
      <div
        tabIndex={0}
        className="dropdown-content p-2 shadow-xl bg-base-100 rounded-box w-52 mt-2 z-50"
      >
        <form
          className="flex flex-col gap-2"
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <label className="label p-0">
            <span className="label-text">Portfolio name</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Seach..."
            className="input input-sm input-bordered w-full max-w-xs"
            onChange={handleFormChange}
            value={formData.name}
          />
          <button
            className="btn btn-sm btn-primary"
            disabled={isEmpty(formData.name)}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPortfolio;
