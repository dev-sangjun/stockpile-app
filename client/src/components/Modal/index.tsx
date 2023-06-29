import { FC } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { RootState } from "../../store";
import { getModalType } from "../../store/modal.reducer";
import ConfirmActionModal from "./ConfirmActionModal";
import { useSelectedEntity } from "../../hooks";
import useDispatchActions from "../../hooks/useDispatchActions";
import EntityModal from "./EntityModal";

const Modal: FC = () => {
  const { authActions, portfolioActions, investmentActions, modalActions } =
    useDispatchActions();
  const { t } = useTranslation();
  const modalType = useSelector((state: RootState) => getModalType(state));
  const { selectedPortfolio, selectedInvestment } = useSelectedEntity();
  if (modalType === "SIGN_OUT") {
    return (
      <ConfirmActionModal
        title="Sign out"
        questionLabel={t("Are you sure you want to sign out?")}
        onConfirm={async () => {
          await authActions.signOut();
          modalActions.close();
        }}
      />
    );
  }
  if (modalType === "ADD_PORTFOLIO" || modalType === "UPDATE_PORTFOLIO") {
    return <EntityModal entityType="PORTFOLIO" />;
  }
  if (modalType === "ADD_INVESTMENT" || modalType === "UPDATE_INVESTMENT") {
    return <EntityModal entityType="INVESTMENT" />;
  }
  if (modalType === "DELETE_PORTFOLIO" && selectedPortfolio) {
    return (
      <ConfirmActionModal
        title="Delete Portfolio"
        questionLabel={t("Are you sure you want to delete", {
          entityName: selectedPortfolio.name,
        })}
        onConfirm={async () => {
          await portfolioActions.delete(selectedPortfolio.id);
          modalActions.close();
        }}
      />
    );
  }
  if (
    modalType === "DELETE_INVESTMENT" &&
    selectedPortfolio &&
    selectedInvestment
  ) {
    return (
      <ConfirmActionModal
        title="Delete Investment"
        questionLabel={t("Are you sure you want to delete", {
          entityName: selectedInvestment.stockId,
        })}
        onConfirm={async () => {
          await investmentActions.delete(
            selectedPortfolio.id,
            selectedInvestment.id
          );
          modalActions.close();
        }}
      />
    );
  }
  return null;
};

export default Modal;
