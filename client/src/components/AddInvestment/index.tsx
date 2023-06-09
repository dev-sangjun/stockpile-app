import { FC } from "react";
import isEmpty from "is-empty";
import { useOutsideClick } from "../../hooks";
import useAddEntityForm from "./useAddInvestmentForm";

const AddInvestment: FC = () => {
  const {
    formData,
    setFormData,
    resetFormData,
    handleFormChange,
    handleSubmit,
  } = useAddEntityForm();
  const formRef = useOutsideClick<HTMLFormElement>(resetFormData);

  const handleSymbolClick = (symbol: string) => {
    setFormData({
      ...formData,
      keyword: symbol,
      filteredSymbols: [],
      selectedSymbol: symbol,
    });
  };
  const renderFilteredSymbols = () => (
    <ul className="menu menu-sm bg-base-200 w-full rounded-box">
      {formData.filteredSymbols.map(symbol => (
        <li key={symbol} onClick={() => handleSymbolClick(symbol)}>
          <a>{symbol}</a>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="dropdown dropdown-bottom dropdown-end top-[-1px]">
      <label tabIndex={0} className="btn btn-xs btn-outline">
        Add Investment
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
            <span className="label-text">Stock symbol</span>
          </label>
          <input
            type="text"
            name="keyword"
            placeholder="Seach..."
            className="input input-sm input-bordered w-full max-w-xs"
            onChange={handleFormChange}
            value={formData.keyword}
          />
          {!isEmpty(formData.filteredSymbols) && renderFilteredSymbols()}
          <label className="label p-0">
            <span className="label-text">Quantity</span>
          </label>
          <input
            type="number"
            name="quantity"
            placeholder="Qty"
            min={0}
            step="0.01"
            className="input input-sm input-bordered w-full max-w-xs"
            onChange={handleFormChange}
            value={formData.quantity}
          />
          <label className="label p-0">
            <span className="label-text">Cost</span>
          </label>
          <input
            type="number"
            name="cost"
            placeholder="Current Price"
            min={0}
            step="0.01"
            className="input input-sm input-bordered w-full max-w-xs"
            onChange={handleFormChange}
            value={formData.cost || ""}
          />
          <button
            className="btn btn-sm btn-primary"
            disabled={isEmpty(formData.selectedSymbol)}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddInvestment;
