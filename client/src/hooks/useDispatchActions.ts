import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import {
  asyncAddToFavoriteStocks,
  asyncDeleteFromFavoriteStocks,
  asyncSignOut,
} from "../store/user.reducer";
import { Investment, Portfolio } from "../global/entity.interfaces";
import {
  deselectInvestment,
  deselectPortfolio,
  selectInvestment,
  selectPortfolio,
} from "../store/entity.reducer";
import { ModalType, closeModal, openModal } from "../store/modal.reducer";

const useDispatchActions = () => {
  const dispatch = useDispatch<AppDispatch>();
  const authActions = {
    signOut: () => dispatch(asyncSignOut()),
  };
  const portfolioActions = {
    select: (portfolio: Portfolio) => dispatch(selectPortfolio(portfolio)),
    deselect: () => {
      dispatch(deselectPortfolio());
      dispatch(deselectInvestment());
    },
  };
  const investmentActions = {
    select: (investment: Investment) => dispatch(selectInvestment(investment)),
    deselect: () => dispatch(deselectInvestment()),
  };
  const stockActions = {
    addToFavorites: (stockId: string) =>
      dispatch(asyncAddToFavoriteStocks(stockId)),
    deleteFromFavorites: (stockId: string) =>
      dispatch(asyncDeleteFromFavoriteStocks(stockId)),
  };
  const modalActions = {
    open: (modalType: ModalType) => dispatch(openModal(modalType)),
    close: () => dispatch(closeModal()),
  };

  return {
    authActions,
    portfolioActions,
    investmentActions,
    stockActions,
    modalActions,
  };
};

export default useDispatchActions;
