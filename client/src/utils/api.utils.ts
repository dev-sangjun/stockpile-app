import { DEV_SERVER_ENDPOINT, TEST_USER_ID } from "../dev/constants";
import { Portfolio } from "../types/entity.types";
import { useFetch } from "../hooks";

export const useFetchPortfolios = (userId: string = TEST_USER_ID) => {
  return useFetch<Portfolio[]>(
    `${DEV_SERVER_ENDPOINT}/portfolios?userId=${userId}`,
    []
  );
};
