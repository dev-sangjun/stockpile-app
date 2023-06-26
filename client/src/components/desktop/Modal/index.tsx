import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { closeModal, getModalType } from "../../../store/modal.reducer";
import ConfirmActionModal from "./ConfirmActionModal";
import { deselectInvestment } from "../../../store/entity.reducer";
import { asyncDeleteInvestmentFromPortfolio } from "../../../store/user.reducer";
import useSelectedEntity from "../../../hooks/useSelectedEntity";

const Modal: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const modalType = useSelector((state: RootState) => getModalType(state));
  const { selectedPortfolio, selectedInvestment } = useSelectedEntity();
  if (
    modalType === "DELETE_INVESTMENT" &&
    selectedPortfolio &&
    selectedInvestment
  ) {
    return (
      <ConfirmActionModal
        title="Delete Investment"
        questionLabel={`Are you sure you want to delete ${selectedInvestment.stockId}`}
        onConfirm={async () => {
          await dispatch(
            asyncDeleteInvestmentFromPortfolio({
              portfolioId: selectedPortfolio.id,
              investmentId: selectedInvestment.id,
            })
          );
          dispatch(deselectInvestment());
          dispatch(closeModal());
        }}
      />
    );
  }
  return null;
};

export default Modal;
