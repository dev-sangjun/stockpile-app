import { FC, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../states/store";
import { getModal } from "../../states/modal.reducer";
import { EntityType, Investment, Portfolio } from "../../types/entity.types";
import UpdatePortfolioForm from "./UpdatePortfolioForm";
import UpdateInvestmentForm from "./UpdateInvestmentForm";

interface UpdateEntityModalProps {
  entity: Portfolio | Investment;
  entityType: EntityType;
}

const UpdateEntityModal: FC<UpdateEntityModalProps> = ({
  entity,
  entityType,
}) => {
  const { isOpen } = useSelector((state: RootState) => getModal(state));
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (dialogRef.current) {
      if (isOpen) {
        dialogRef.current.showModal();
      } else {
        dialogRef.current.close();
      }
    }
  }, [isOpen]);
  return (
    <dialog id="my_modal_1" className="modal" ref={dialogRef}>
      {entityType === "Portfolio" ? (
        <UpdatePortfolioForm portfolio={entity as Portfolio} />
      ) : (
        <UpdateInvestmentForm investment={entity as Investment} />
      )}
    </dialog>
  );
};

export default UpdateEntityModal;
