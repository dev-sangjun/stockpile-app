import { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import isEmpty from "is-empty";
import { RootState } from "../../../../store";
import { getEntity } from "../../../../store/entity.reducer";
import useInvestmentForm from "./useInvestmentForm";
import useDispatchActions from "../../../../hooks/useDispatchActions";

import {
  BASE_BUTTON_CLASSES,
  BASE_INPUT_CLASSES,
  PRIMARY_BUTTON_CLASSES,
} from "../../../../constants/classes.constants";
import { renderFieldErrorMessages } from "../../../../utils/error.utils";
import SuggestionDropdown from "../../../common/SuggestionDropdown";
import { getSymbols } from "../../../../store/stocks.reducer";

const InvestmentForm = () => {
  const { modalActions } = useDispatchActions();
  const { t } = useTranslation();
  const { selectedInvestment } = useSelector((state: RootState) =>
    getEntity(state)
  );
  const symbols = useSelector((state: RootState) => getSymbols(state));
  const [selectedSymbol, setSelectedSymbol] = useState(
    selectedInvestment?.stockId ?? ""
  );
  const { registerers, onSubmit, watch, errors, isValid } =
    useInvestmentForm(selectedSymbol);
  const title = selectedInvestment ? "Update Investment" : "Add Investment";
  const isSubmitButtonDisabled =
    !isValid ||
    isEmpty(selectedSymbol) ||
    (selectedInvestment &&
      watch("quantity") === selectedInvestment.quantity &&
      watch("cost") === selectedInvestment.avgCost);
  const defaultValues = {
    selectedSymbol: selectedInvestment?.stockId ?? "",
    quantity: selectedInvestment?.quantity ?? "",
    cost: selectedInvestment?.avgCost ?? "",
  };
  const numberInputProps = {
    type: "number",
    step: "0.01",
  };
  return (
    <form
      method="dialog"
      className="modal-box flex flex-col gap-4"
      onSubmit={onSubmit}
    >
      <h3 className="font-bold text-lg">{t(title)}</h3>
      <SuggestionDropdown
        defaultValue={defaultValues.selectedSymbol}
        placeholder={t("Search stocks...")}
        readOnly={!!selectedInvestment}
        options={symbols}
        handleSuggestionClick={suggestion => setSelectedSymbol(suggestion)}
      />
      <input
        className={BASE_INPUT_CLASSES.sm}
        placeholder={t("Quantity")}
        defaultValue={defaultValues.quantity}
        {...numberInputProps}
        {...registerers.quantity}
      />
      {renderFieldErrorMessages(errors.quantity)}
      <input
        className={BASE_INPUT_CLASSES.sm}
        placeholder={t("Price")}
        defaultValue={defaultValues.cost}
        {...numberInputProps}
        {...registerers.cost}
      />
      {renderFieldErrorMessages(errors.quantity)}
      <div className="modal-action mt-0">
        <button
          className={BASE_BUTTON_CLASSES.sm}
          type="button"
          onClick={modalActions.close}
        >
          {t("Cancel")}
        </button>
        <button
          className={PRIMARY_BUTTON_CLASSES.sm}
          type="submit"
          disabled={isSubmitButtonDisabled}
        >
          {t(selectedInvestment ? "Update" : "Confirm")}
        </button>
      </div>
    </form>
  );
};

export default InvestmentForm;
