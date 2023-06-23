import { toast } from "react-hot-toast";

type ToastType = "success" | "error";

export const notify = (message: string, type: ToastType = "success") =>
  toast(message, {
    duration: 3000,
    position: "bottom-right",
    icon: type === "success" ? "👏" : "🥲",
  });
