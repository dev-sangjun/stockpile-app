import isEmpty from "is-empty";
import {
  FinnhubCompanyResponseDto,
  FinnhubStockResponseDto,
} from "../interfaces/dto/finnhub.dto";
import { ResourceNotFoundError } from "../global/errors.global";

const { FINNHUB_API_ENDPOINT, FINNHUB_API_KEY } = process.env;
const getFetchStockUrl = (q: string) =>
  `${FINNHUB_API_ENDPOINT}/quote?symbol=${q}&token=${FINNHUB_API_KEY}`;
const getFetchCompanyUrl = (q: string) =>
  `${FINNHUB_API_ENDPOINT}/stock/profile2?symbol=${q}&token=${FINNHUB_API_KEY}`;

// finnhub will return non-empty response with c == 0 & pc == 0 for invalid stock symobl
const isStockResponseValid = (stockResponseDto: FinnhubStockResponseDto) =>
  stockResponseDto.c !== 0 && stockResponseDto.pc !== 0;

/**
 *
 * @param q stock symbol
 * @returns stock data
 */
const fetchStock = async (q: string): Promise<FinnhubStockResponseDto> => {
  const stockResponseDto: FinnhubStockResponseDto = await fetch(
    getFetchStockUrl(q),
    {
      cache: "no-cache",
    }
  ).then(res => res.json());
  if (!isStockResponseValid(stockResponseDto)) {
    throw new ResourceNotFoundError();
  }
  const { c, d, dp, h, l, pc } = stockResponseDto;
  return {
    c,
    d,
    dp,
    h,
    l,
    pc,
  };
};

/**
 *
 * @param q company's stock symbol
 * @returns company data
 */
const fetchCompany = async (q: string) => {
  const companyResponseDto: FinnhubCompanyResponseDto = await fetch(
    getFetchCompanyUrl(q),
    {
      cache: "no-cache",
    }
  ).then(res => res.json());
  return companyResponseDto;
};

export default {
  fetchStock,
  fetchCompany,
};
