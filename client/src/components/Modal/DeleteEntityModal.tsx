import { FC, FormEvent, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../states/store";
import { closeModal, getModal } from "../../states/modal.reducer";
import { EntityType, Investment, Portfolio } from "../../types/entity.types";
import {
  deleteInvestmentFromPortfolio,
  deletePortfolio,
} from "../../api/portfolio.api";
import { asyncFetchUser } from "../../states/user.reducer";
import { notify } from "../../utils/toast.utils";

interface DeleteEntityModalProps {
  entity: Portfolio | Investment;
  entityType: EntityType;
}

const DeleteEntityModal: FC<DeleteEntityModalProps> = ({
  entity,
  entityType,
}) => {
  const dispatch = useDispatch<AppDispatch>();
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
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (entityType === "Portfolio") {
      const res = await deletePortfolio(entity.id);
      if (!res.success) {
        throw new Error("Something went wrong!");
      }
      notify(`Successfully deleted ${(entity as Portfolio).name}`);
    } else {
      const { id, portfolioId, stockId } = entity as Investment;
      const res = await deleteInvestmentFromPortfolio({
        portfolioId,
        investmentId: id,
      });
      if (!res.success) {
        throw new Error("Something went wrong!");
      }
      notify(`Successfully deleted ${stockId}`);
    }
    await dispatch(asyncFetchUser());
    dispatch(closeModal());
  };
  const handleCancel = () => dispatch(closeModal());
  const getTitle = () => {
    if (entityType === "Portfolio") {
      return (entity as Portfolio).name;
    }
    return (entity as Investment).stockId;
  };
  return (
    <dialog id="my_modal_1" className="modal" ref={dialogRef}>
      <form method="dialog" className="modal-box" onSubmit={handleSubmit}>
        <h3 className="font-bold text-lg">Delete {entityType}</h3>
        <p className="py-4">Are you sure you want to delete {getTitle()}?</p>
        <div className="modal-action">
          <button
            className="btn btn-ghost btn-sm normal-case"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button className="btn btn-primary btn-sm normal-case" type="submit">
            Confirm
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default DeleteEntityModal;
