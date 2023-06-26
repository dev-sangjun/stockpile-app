import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { getModalType } from "../../../store/modal.reducer";
import PortfolioForm from "./PortfolioForm";

const PortfolioModal = () => {
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
    <dialog id="portfolio_modal" className="modal" ref={dialogRef}>
      <PortfolioForm />
    </dialog>
  );
};

export default PortfolioModal;
