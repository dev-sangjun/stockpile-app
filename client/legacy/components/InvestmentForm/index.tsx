import { ChangeEvent, FC, useState } from "react";
import useInvestmentForm from "./useInvestmentForm";
import { renderFieldErrorMessages } from "../../utils/renderers.utils";
import isEmpty from "is-empty";
import { getFilteredSymbols } from "../InvestmentList/AddInvestmentDropdown/utils";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../states/store";
import { getSymbols } from "../../states/stocks.reducer";
import { useOutsideClick } from "../../hooks";
import { addInvestmentToPortfolio } from "../../api/portfolio.api";
import {
  asyncFetchUser,
  getSelectedPortfolio,
} from "../../states/user.reducer";
import { notify } from "../../utils/toast.utils";
import { Investment } from "../../types/entity.types";
import { closeModal } from "../../states/modal.reducer";
import { updateInvestment } from "../../api/investment.api";

interface SymbolState {
  keyword: string;
  selectedSymbol: string;
  filteredSymbols: string[];
}

interface InvestmentFormProps {
  className?: string;
  title?: string;
  titleLabel?: string;
  actionType: "ADD" | "UPDATE";
  investment?: Investment;
  isModal?: boolean;
  submitCallback?: () => void;
}

const InvestmentForm: FC<InvestmentFormProps> = ({
  className,
  title,
  titleLabel,
  actionType,
  investment,
  isModal = false,
  submitCallback,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const symbols = useSelector((state: RootState) => getSymbols(state));
  const selectedPortfolio = useSelector((state: RootState) =>
    getSelectedPortfolio(state)
  );
  const { registerers, handleSubmit, watch, errors, reset, isValid } =
    useInvestmentForm(actionType === "UPDATE");
  const watchFields = watch();
  const isUpdateAction = actionType === "UPDATE" && !!investment;
  const initialSymbolState: SymbolState = {
    keyword: isUpdateAction ? investment.stockId : "",
    selectedSymbol: "",
    filteredSymbols: [],
  };
  const [symbolState, setSymbolState] =
    useState<SymbolState>(initialSymbolState);
  const keywordInputProps = isUpdateAction
    ? {
        defaultValue: investment.stockId,
      }
    : { value: symbolState.keyword };
  const resetForm = () => {
    reset();
    setSymbolState(initialSymbolState);
  };
  const formRef = useOutsideClick<HTMLFormElement>(resetForm);
  const handleSymbolClick = (symbol: string) => {
    setSymbolState(prev => ({
      ...prev,
      keyword: symbol,
      selectedSymbol: symbol,
      filteredSymbols: [],
    }));
  };
  const renderFilteredSymbols = () => (
    <ul className="menu menu-sm bg-slate-100 w-full rounded-box">
      {symbolState.filteredSymbols.map(symbol => (
        <li key={symbol} onClick={() => handleSymbolClick(symbol)}>
          <a>{symbol}</a>
        </li>
      ))}
    </ul>
  );
  const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (actionType === "UPDATE") {
      return;
    }
    const { value } = e.currentTarget;
    if (isEmpty(value)) {
      setSymbolState(prev => ({
        ...prev,
        keyword: value,
        filteredSymbols: [],
      }));
      return;
    }
    // update filteredSymbols with the new keyword
    setSymbolState(prev => ({
      ...prev,
      keyword: value,
      filteredSymbols: getFilteredSymbols(value, symbols),
    }));
  };
  const renderActionButtons = () =>
    isUpdateAction && isModal ? (
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
          disabled={isNaN(watchFields.quantity) && isNaN(watchFields.cost)}
        >
          Confirm
        </button>
      </div>
    ) : (
      <button
        className="btn btn-primary btn-sm normal-case"
        disabled={isEmpty(symbolState.selectedSymbol) || !isValid}
      >
        Submit
      </button>
    );
  const onSubmit = handleSubmit(async data => {
    if (
      (actionType === "ADD" && isEmpty(symbolState.selectedSymbol)) ||
      !selectedPortfolio
    ) {
      return;
    }
    if (isUpdateAction && isNaN(data.quantity) && isNaN(data.cost)) {
      // return if both quantity and cost were left blank
      return;
    }
    const { quantity, cost } = data;
    try {
      if (actionType === "ADD") {
        // add investment -> refetch user
        await addInvestmentToPortfolio({
          quantity,
          cost: isEmpty(cost) ? undefined : cost,
          stockId: symbolState.selectedSymbol,
          portfolioId: selectedPortfolio.id,
        });
      } else if (isUpdateAction) {
        const res = await updateInvestment(investment.id, {
          quantity,
          avgCost: cost,
        });
        if (!res?.success) {
          throw new Error("Something went wrong!");
        }
      }
      await dispatch(asyncFetchUser());
      notify(
        `Successfully ${isUpdateAction ? "updated" : "added"} ${
          isUpdateAction ? investment.stockId : symbolState.selectedSymbol
        }`
      );
      if (submitCallback) {
        submitCallback();
      }
      dispatch(closeModal());
    } catch (e) {
      console.error(e);
    }
  });
  return (
    <form
      className={`flex flex-col gap-2 ${className}`}
      onSubmit={onSubmit}
      ref={formRef}
    >
      {title && <h3 className="font-bold text-lg">{title}</h3>}
      {titleLabel && (
        <label className="label p-0">
          <span className="label-text font-bold">{titleLabel}</span>
        </label>
      )}
      <input
        type="text"
        name="keyword"
        placeholder="Seach..."
        className={`input input-sm input-bordered w-full ${
          isUpdateAction ? "cursor-default select-none" : ""
        }`}
        contentEditable={!isUpdateAction}
        readOnly={isUpdateAction}
        onChange={handleKeywordChange}
        {...keywordInputProps}
      />
      {!isEmpty(symbolState.filteredSymbols) && renderFilteredSymbols()}
      <input
        className="input input-sm input-bordered w-full"
        type="number"
        placeholder={
          isUpdateAction ? `Quantity: ${investment.quantity}` : "Quantity"
        }
        step="0.01"
        {...registerers.quantity}
      />
      {renderFieldErrorMessages(errors.quantity)}
      <input
        className="input input-sm input-bordered w-full"
        type="number"
        placeholder={
          isUpdateAction
            ? `Average cost: ${investment.avgCost}`
            : "Current price"
        }
        step="0.01"
        {...registerers.cost}
      />
      {renderFieldErrorMessages(errors.cost)}
      {renderActionButtons()}
    </form>
  );
};

export default InvestmentForm;
