import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { getModalType } from "../../../store/modal.reducer";
import ConfirmActionModal from "./ConfirmActionModal";
import { useSelectedEntity } from "../../../hooks";
import useDispatchActions from "../../../hooks/useDispatchActions";
import PortfolioModal from "./PortfolioModal";

const Modal: FC = () => {
  const { portfolioActions, investmentActions, modalActions } =
    useDispatchActions();
  const modalType = useSelector((state: RootState) => getModalType(state));
  const { selectedPortfolio, selectedInvestment } = useSelectedEntity();
  if (modalType === "DELETE_PORTFOLIO" && selectedPortfolio) {
    return (
      <ConfirmActionModal
        title="Delete Portfolio"
        questionLabel={`Are you sure you want to delete ${selectedPortfolio.name}?`}
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
        questionLabel={`Are you sure you want to delete ${selectedInvestment.stockId}?`}
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
  if (modalType === "ADD_PORTFOLIO" || modalType === "UPDATE_PORTFOLIO") {
    return <PortfolioModal />;
  }
  return null;
};

export default Modal;
