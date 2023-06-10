import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../states/store";
import { getModal } from "../states/modal.reducer";
import DeleteEntityModal from "./DeleteEntityModal";

const Modal: FC = () => {
  const { isOpen, type, payload, payloadType } = useSelector(
    (state: RootState) => getModal(state)
  );
  if (!isOpen || !type || !payload) {
    return null;
  }
  if (type === "DELETE_ENTITY" && payload && payloadType) {
    return <DeleteEntityModal entity={payload} entityType={payloadType} />;
  }
  return <div>Modal</div>;
};

export default Modal;
