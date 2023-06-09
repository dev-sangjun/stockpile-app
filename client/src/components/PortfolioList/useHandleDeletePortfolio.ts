import { useDispatch } from "react-redux";
import { AppDispatch } from "../../states/store";
import { deletePortfolio } from "../../api/portfolio.api";
import { asyncFetchUser } from "../../states/user.reducer";

const useHandleDeletePortfolio = (portfolioId: string) => {
  const dispatch = useDispatch<AppDispatch>();
  return async () => {
    await deletePortfolio(portfolioId);
    dispatch(asyncFetchUser());
  };
};

export default useHandleDeletePortfolio;
