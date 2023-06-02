import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { Portfolio } from "../types/entity.types";

interface StocksState {
  portfolios: Portfolio[];
}

const initialState: StocksState = {
  portfolios: [],
};

export const portfoliosSlice = createSlice({
  name: "portfolios",
  initialState,
  reducers: {
    updatePortfolios: (state, action: PayloadAction<Portfolio[]>) => {
      state.portfolios = action.payload;
    },
  },
});

export const { updatePortfolios } = portfoliosSlice.actions;

export const getPortfolios = (state: RootState) =>
  state.portfoliosReducer.portfolios;

export default portfoliosSlice.reducer;
