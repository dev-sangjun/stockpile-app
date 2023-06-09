import { FC, FormEvent } from "react";

interface ConfirmationModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
}

const ConfirmationModal: FC<ConfirmationModalProps> = ({
  title,
  message,
  onConfirm,
}) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onConfirm();
  };
  return (
    <dialog id="my_modal_1" className="modal">
      <form method="dialog" className="modal-box" onSubmit={handleSubmit}>
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="py-4">{message}</p>
        <div className="modal-action">
          <button className="btn btn-ghost" type="button">
            Cancel
          </button>
          <button className="btn btn-primary" type="submit">
            Confirm
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default ConfirmationModal;
