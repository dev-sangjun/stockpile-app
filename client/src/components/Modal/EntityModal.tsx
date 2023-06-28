import { FC, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { getModalType } from "../../store/modal.reducer";
import PortfolioForm from "./PortfolioForm";
import { EntityType } from "../../global/entity.interfaces";
import InvestmentForm from "./InvestmentForm";

interface EntityModalProps {
  entityType: EntityType;
}

const EntityModal: FC<EntityModalProps> = ({ entityType }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const modalType = useSelector((state: RootState) => getModalType(state));
  useEffect(() => {
    if (dialogRef.current) {
      if (modalType) {
        dialogRef.current.showModal();
      } else {
        dialogRef.current.close();
      }
    }
  }, [modalType]);
  return (
    <dialog id="entity_modal" className="modal" ref={dialogRef}>
      {entityType === "PORTFOLIO" ? <PortfolioForm /> : <InvestmentForm />}
    </dialog>
  );
};

export default EntityModal;
