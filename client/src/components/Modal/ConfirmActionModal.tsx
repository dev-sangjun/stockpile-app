import { FC, FormEvent, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { RootState } from "../../store";
import { getModalType } from "../../store/modal.reducer";
import useDispatchActions from "../../hooks/useDispatchActions";

interface ConfirmActionModalProps {
  title: string;
  questionLabel: string;
  onConfirm: () => void;
}

const ConfirmActionModal: FC<ConfirmActionModalProps> = ({
  title,
  questionLabel,
  onConfirm,
}) => {
  const { modalActions } = useDispatchActions();
  const { t } = useTranslation();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const modalType = useSelector((state: RootState) => getModalType(state));
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onConfirm();
  };
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
    <dialog id="confirm_action_modal" className="modal" ref={dialogRef}>
      <form method="dialog" className="modal-box" onSubmit={handleSubmit}>
        <h3 className="font-bold text-lg">{t(title)}</h3>
        <p className="py-4">{t(questionLabel)}</p>
        <div className="modal-action">
          <button
            className="btn btn-ghost btn-sm normal-case"
            type="button"
            onClick={modalActions.close}
          >
            {t("Cancel")}
          </button>
          <button className="btn btn-primary btn-sm normal-case" type="submit">
            {t("Confirm")}
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default ConfirmActionModal;
