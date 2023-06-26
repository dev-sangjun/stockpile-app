import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { asyncFetchUser, asyncSignOut } from "../store/user.reducer";
import { Investment, Portfolio } from "../global/entity.interfaces";
import {
  deselectInvestment,
  deselectPortfolio,
  selectInvestment,
  selectPortfolio,
} from "../store/entity.reducer";
import { ModalType, closeModal, openModal } from "../store/modal.reducer";
import { notify, notifyError } from "../utils/common.utils";
import { investmentAPI, portfolioAPI, stockAPI } from "../api";

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
    add: async (portfolioName: string) => {
      const portfolio = await portfolioAPI.addPortfolio(portfolioName);
      await dispatch(asyncFetchUser());
      notify(`Successfully added ${portfolio.name}!`);
    },
    update: async (portfolioId: string, portfolioName: string) => {
      const res = await portfolioAPI.updatePortfolio(
        portfolioId,
        portfolioName
      );
      if (res.success) {
        await dispatch(asyncFetchUser());
        notify(`Successfully updated ${portfolioName}!`);
      } else {
        notifyError();
      }
    },
    delete: async (portfolioId: string) => {
      const res = await portfolioAPI.deletePortfolio(portfolioId);
      if (res.success) {
        await dispatch(asyncFetchUser());
        notify(`Successfully deleted the portfolio!`);
        dispatch(deselectPortfolio());
        dispatch(deselectInvestment());
      } else {
        notifyError();
      }
    },
  };
  const investmentActions = {
    select: (investment: Investment) => dispatch(selectInvestment(investment)),
    deselect: () => dispatch(deselectInvestment()),
    delete: async (portfolioId: string, investmentId: string) => {
      const res = await investmentAPI.deleteInvestmentFromPortfolio({
        portfolioId,
        investmentId,
      });
      if (res.success) {
        await dispatch(asyncFetchUser());
        notify(`Successfully deleted the investment!`);
        dispatch(deselectInvestment());
      } else {
        notifyError();
      }
    },
  };
  const stockActions = {
    addToFavorites: async (stockId: string) => {
      const res = await stockAPI.addToFavoriteStocks(stockId);
      if (res.success) {
        await dispatch(asyncFetchUser());
      } else {
        notifyError();
      }
    },
    deleteFromFavorites: async (stockId: string) => {
      const res = await stockAPI.deleteFromFavoriteStocks(stockId);
      if (res.success) {
        await dispatch(asyncFetchUser());
      } else {
        notifyError();
      }
    },
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
