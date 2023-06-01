import numeral from "numeral";

export const toUSD = (value: string | number) =>
  numeral(value).format("$0,0.00");
