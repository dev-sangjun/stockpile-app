import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../store/user.reducer";
import { AppDispatch, RootState } from "../store";
import { getEntity, selectPortfolio } from "../store/entity.reducer";
import { useEffect } from "react";

const useSelectedEntity = () => {
  const dispatch = useDispatch<AppDispatch>();
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
        dispatch(selectPortfolio(updatedPortfolio));
      }
    }
  }, [dispatch, selectedPortfolio, portfolios]);
  return { selectedPortfolio, selectedInvestment };
};

export default useSelectedEntity;
