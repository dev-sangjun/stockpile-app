import numeral from "numeral";
import { toast } from "react-hot-toast";

export const toUSD = (value: string | number, includeDecimal = true) =>
  numeral(value).format(includeDecimal ? "$0,0.00" : "$0,0");

export const hasAllKeys = (keys: string[], obj: object) =>
  keys.every(key => Object.keys(obj).includes(key));

export const capitalize = (word: string) => {
  if (word === "") {
    return word;
  }
  return word[0].toUpperCase() + word.slice(1);
};

export const toDecimal = (num: number, digits = 2) =>
  parseFloat(num.toFixed(digits));

type ToastType = "success" | "error";
export const notify = (message: string, type: ToastType = "success") =>
  toast(message, {
    duration: 3000,
    position: "bottom-right",
    icon: type === "success" ? "👏" : "🥲",
  });
