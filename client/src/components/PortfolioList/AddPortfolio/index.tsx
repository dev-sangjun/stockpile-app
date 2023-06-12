import { FC, useRef } from "react";
import isEmpty from "is-empty";
import { useOutsideClick } from "../../../hooks";
import useAddPortfolioForm from "./useAddPortfolioForm";
import { HiPlus } from "react-icons/hi2";

const AddPortfolio: FC = () => {
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const closeDropdown = () => {
    // blurs submit button & closes dropdown
    if (submitButtonRef.current) {
      submitButtonRef.current.blur();
    }
  };
  const { formData, resetFormData, handleFormChange, handleSubmit } =
    useAddPortfolioForm(closeDropdown);
  const formRef = useOutsideClick<HTMLFormElement>(resetFormData);
  return (
    <div className="dropdown dropdown-bottom dropdown-end top-[-1px]">
      <label tabIndex={0} className="btn btn-xs btn-outline">
        <HiPlus />
      </label>
      <div
        tabIndex={0}
        className="dropdown-content p-4 shadow-xl bg-base-100 rounded-box w-52 mt-2 z-50"
      >
        <form
          className="flex flex-col gap-2"
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <label className="label p-0">
            <span className="label-text font-bold">Portfolio name</span>
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
            ref={submitButtonRef}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPortfolio;
