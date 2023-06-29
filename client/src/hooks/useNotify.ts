import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";
import emojis from "../constants/emoji.constants";

type ToastType = "success" | "error";

const useNotify = () => {
  const { t } = useTranslation();
  const notify = (message: string, type: ToastType = "success") =>
    toast(t(message), {
      duration: 3000,
      position: "bottom-right",
      icon: type === "success" ? emojis.clap : emojis.crying,
      className: "mb-16 md:mb-4",
    });

  const notifyError = () => notify("Something went wrong!", "error");
  return { notify, notifyError };
};

export default useNotify;
