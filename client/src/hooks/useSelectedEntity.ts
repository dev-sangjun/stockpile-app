import { useSelector } from "react-redux";
import { getUser } from "../store/user.reducer";
import { RootState } from "../store";
import { getEntity } from "../store/entity.reducer";
import { useEffect } from "react";
import useDispatchActions from "./useDispatchActions";

const useSelectedEntity = () => {
  const { portfolioActions, investmentActions } = useDispatchActions();
  const { portfolios } = useSelector((state: RootState) => getUser(state));
  const { selectedPortfolio, selectedInvestment } = useSelector(
    (state: RootState) => getEntity(state)
  );
  useEffect(() => {
    if (selectedPortfolio) {
      const updatedPortfolio = portfolios.find(
        ({ id }) => id === selectedPortfolio.id
      );
      if (updatedPortfolio) {
        portfolioActions.select(updatedPortfolio);
        if (selectedInvestment) {
          const updatedInvestment = updatedPortfolio.investments.find(
            ({ id }) => id === selectedInvestment.id
          );
          if (updatedInvestment) {
            investmentActions.select(updatedInvestment);
          }
        }
      }
    }
  }, [
    portfolioActions,
    investmentActions,
    selectedPortfolio,
    selectedInvestment,
    portfolios,
  ]);
  return { selectedPortfolio, selectedInvestment };
};

export default useSelectedEntity;
