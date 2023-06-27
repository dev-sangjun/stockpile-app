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
import { asyncFetchSymbols } from "../store/stocks.reducer";
import {
  AddInvestmentToPortfolioDto,
  UpdateInvestmentDto,
} from "../api/interfaces";

const useDispatchActions = () => {
  const dispatch = useDispatch<AppDispatch>();
  const authActions = {
    signOut: () => dispatch(asyncSignOut()),
  };
  const userActions = {
    fetch: () => dispatch(asyncFetchUser()),
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
    add: async (portfolioId: string, dto: AddInvestmentToPortfolioDto) => {
      const investment = await investmentAPI.addInvestmentToPortfolio(
        portfolioId,
        dto
      );
      await dispatch(asyncFetchUser());
      notify(`Successfully added ${investment.stockId}!`);
    },
    update: async (investmentId: string, dto: UpdateInvestmentDto) => {
      const res = await investmentAPI.updateInvestment(investmentId, dto);
      if (res.success) {
        await dispatch(asyncFetchUser());
        notify(`Successfully updated the investment!`);
      } else {
        notifyError();
      }
    },
    delete: async (portfolioId: string, investmentId: string) => {
      const res = await investmentAPI.deleteInvestmentFromPortfolio(
        portfolioId,
        investmentId
      );
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
    fetchSymbols: () => dispatch(asyncFetchSymbols()),
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
    userActions,
    portfolioActions,
    investmentActions,
    stockActions,
    modalActions,
  };
};

export default useDispatchActions;
