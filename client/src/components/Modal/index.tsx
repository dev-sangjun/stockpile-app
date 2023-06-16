import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../states/store";
import { getModal } from "../../states/modal.reducer";
import DeleteEntityModal from "./DeleteEntityModal";
import EditEntityModal from "./UpdateEntityModal";

const Modal: FC = () => {
  const { isOpen, type, payload, payloadType } = useSelector(
    (state: RootState) => getModal(state)
  );
  if (!isOpen || !type || !payload || !payloadType) {
    return null;
  }
  if (type === "UPDATE_ENTITY") {
    return <EditEntityModal entity={payload} entityType={payloadType} />;
  }
  if (type === "DELETE_ENTITY") {
    return <DeleteEntityModal entity={payload} entityType={payloadType} />;
  }
  return <div>Modal</div>;
};

export default Modal;
