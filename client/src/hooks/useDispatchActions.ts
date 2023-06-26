import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import {
  asyncAddToFavoriteStocks,
  asyncDeleteFromFavoriteStocks,
  asyncDeleteInvestmentFromPortfolio,
  asyncDeletePortfolio,
  asyncFetchUser,
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
import { notify } from "../utils/common.utils";

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
    delete: async (portfolioId: string) => {
      await dispatch(asyncDeletePortfolio(portfolioId));
      await dispatch(asyncFetchUser());
      notify(`Successfully deleted the portfolio!`);
      dispatch(deselectPortfolio());
      dispatch(deselectInvestment());
    },
  };
  const investmentActions = {
    select: (investment: Investment) => dispatch(selectInvestment(investment)),
    deselect: () => dispatch(deselectInvestment()),
    delete: async (portfolioId: string, investmentId: string) => {
      await dispatch(
        asyncDeleteInvestmentFromPortfolio({
          portfolioId,
          investmentId,
        })
      );
      await dispatch(asyncFetchUser());
      notify("Successfully deleted the investment!");
      dispatch(deselectInvestment());
    },
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
