import numeral from "numeral";

export const toUSD = (value: string | number, includeDecimal = true) =>
  numeral(value).format(includeDecimal ? "$0,0.00" : "$0,0");
