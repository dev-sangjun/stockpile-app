import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { Portfolio } from "../types/entity.types";
import { fetchPortfoliosByUserId } from "../utils/api.utils";

interface PortfoliosState {
  portfolios: Portfolio[];
  selectedPortfolio: Portfolio | null;
}

const initialState: PortfoliosState = {
  portfolios: [],
  selectedPortfolio: null,
};

export const asyncFetchPortfolios = createAsyncThunk(
  "portfolios/asyncFetchPortfolios",
  async (userId: string) => {
    const portfolios = await fetchPortfoliosByUserId(userId);
    return portfolios;
  }
);

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
  extraReducers: builder => {
    builder.addCase(asyncFetchPortfolios.fulfilled, (state, action) => {
      state.portfolios = action.payload;
      // update selectedPortfolio to reflect the fetched results without refreshing the page
      if (state.selectedPortfolio) {
        const updatedPortfolio = action.payload.find(
          portfolio => portfolio.id === state.selectedPortfolio?.id
        );
        if (updatedPortfolio) {
          state.selectedPortfolio = updatedPortfolio;
        }
      }
    });
  },
});

export const { updatePortfolios, selectPortfolio, deselectPortfolio } =
  portfoliosSlice.actions;

export const getPortfolios = (state: RootState) =>
  state.portfoliosReducer.portfolios;

export const getSelectedPortfolio = (state: RootState) =>
  state.portfoliosReducer.selectedPortfolio;

export default portfoliosSlice.reducer;
