import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { Portfolio } from "../types/entity.types";

interface PortfoliosState {
  portfolios: Portfolio[];
  selectedPortfolio: Portfolio | null;
}

const initialState: PortfoliosState = {
  portfolios: [],
  selectedPortfolio: null,
};

export const portfoliosSlice = createSlice({
  name: "portfolios",
  initialState,
  reducers: {
    updatePortfolios: (state, action: PayloadAction<Portfolio[]>) => {
      state.portfolios = action.payload;
    },
    selectPortfolio: (state, action: PayloadAction<Portfolio>) => {
      state.selectedPortfolio = action.payload;
    },
    deselectPortfolio: state => {
      state.selectedPortfolio = null;
    },
  },
});

export const { updatePortfolios, selectPortfolio, deselectPortfolio } =
  portfoliosSlice.actions;

export const getPortfolios = (state: RootState) =>
  state.portfoliosReducer.portfolios;

export const getSelectedPortfolio = (state: RootState) =>
  state.portfoliosReducer.selectedPortfolio;

export default portfoliosSlice.reducer;
