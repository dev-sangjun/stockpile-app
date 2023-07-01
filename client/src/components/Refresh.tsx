import { FC, useState } from "react";
import { HiOutlineArrowPath } from "react-icons/hi2";
import { useTranslation } from "react-i18next";
import useDispatchActions from "../hooks/useDispatchActions";
import { LINK_BUTTON_CLASSES } from "../constants/classes.constants";
import { ThreeDots } from "react-loader-spinner";
import useNotify from "../hooks/useNotify";

interface RefreshProps {
  className?: string;
}

const Refresh: FC<RefreshProps> = ({ className = "" }) => {
  const { userActions } = useDispatchActions();
  const { t } = useTranslation();
  const [isRefreshed, setIsRefreshed] = useState(true);
  const { notify } = useNotify();
  const handleClick = () => {
    setIsRefreshed(false);
    const timeout = () =>
      setTimeout(() => {
        setIsRefreshed(true);
        notify(t("Successfully refreshed the data!"));
      }, 1000);
    userActions.fetch(timeout);
  };
  return (
    <button
      className={`${LINK_BUTTON_CLASSES.sm} text-xl ${className}`}
      onClick={handleClick}
    >
      {isRefreshed ? (
        <HiOutlineArrowPath />
      ) : (
        <ThreeDots width="24" height="24" color="#B1B9C5" />
      )}
    </button>
  );
};

export default Refresh;
