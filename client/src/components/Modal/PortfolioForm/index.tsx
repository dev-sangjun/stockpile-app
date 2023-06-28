import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import usePortfolioForm from "./usePortfolioForm";
import { getEntity } from "../../../store/entity.reducer";
import { RootState } from "../../../store";
import useDispatchActions from "../../../hooks/useDispatchActions";
import {
  BASE_BUTTON_CLASSES,
  BASE_INPUT_CLASSES,
  PRIMARY_BUTTON_CLASSES,
} from "../../../constants/classes.constants";
import { renderFieldErrorMessages } from "../../../utils/error.utils";

const PortfolioForm = () => {
  const { modalActions } = useDispatchActions();
  const { t } = useTranslation();
  const { selectedPortfolio } = useSelector((state: RootState) =>
    getEntity(state)
  );
  const { registerers, onSubmit, watch, errors, isValid } =
    usePortfolioForm(selectedPortfolio);
  const title = selectedPortfolio ? "Update Portfolio" : "Add Portfolio";
  const isSubmitButtonDisabled =
    !isValid || (selectedPortfolio && selectedPortfolio.name === watch("name"));
  const nameInputProps = selectedPortfolio
    ? {
        defaultValue: selectedPortfolio.name,
      }
    : {};
  return (
    <form
      method="dialog"
      className="modal-box flex flex-col gap-4"
      onSubmit={onSubmit}
    >
      <h3 className="font-bold text-lg">{t(title)}</h3>
      <input
        className={BASE_INPUT_CLASSES.sm}
        placeholder={t("Portfolio name")}
        {...nameInputProps}
        {...registerers.name}
      />
      {renderFieldErrorMessages(errors.name)}
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
          {t("Confirm")}
        </button>
      </div>
    </form>
  );
};

export default PortfolioForm;
