import { useDispatch } from "react-redux";
import { deleteInvestmentFromPortfolio } from "../../api/portfolio.api";
import { asyncFetchUser } from "../../states/user.reducer";
import { AppDispatch } from "../../states/store";

const useHandleDeleteInvestment = (
  portfolioId: string | undefined,
  investmentId: string
) => {
  const dispatch = useDispatch<AppDispatch>();
  return async () => {
    if (!portfolioId) {
      return;
    }
    await deleteInvestmentFromPortfolio({
      portfolioId,
      investmentId,
    });
    dispatch(asyncFetchUser());
  };
};

export default useHandleDeleteInvestment;
