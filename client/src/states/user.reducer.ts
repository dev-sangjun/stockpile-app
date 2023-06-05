import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { fetchUser } from "../api/user.api";
import {
  Portfolio,
  Investments,
  Stocks,
  UserInfo,
} from "../types/entity.types";
import { getInvestmentsObject, getStocksObject } from "../utils/entity.utils";

interface UserState {
  userInfo: UserInfo | null;
  portfolios: Portfolio[];
  selectedPortfolio?: Portfolio | null;
  investments: Investments;
  stocks: Stocks;
}

const initialState: UserState = {
  userInfo: null,
  portfolios: [],
  selectedPortfolio: null,
  investments: {},
  stocks: {},
};

export const asyncFetchUser = createAsyncThunk(
  "user/asyncFetchUser",
  async (userId: string): Promise<UserState> => {
    const user = await fetchUser(userId);
    const { id, email, username, portfolios, investments, stocks } = user;
    const userInfo: UserInfo = {
      id,
      email,
      username,
    };
    return {
      userInfo,
      portfolios,
      investments: getInvestmentsObject(investments),
      stocks: getStocksObject(stocks),
    };
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    selectPortfolio: (state, action: PayloadAction<Portfolio>) => {
      state.selectedPortfolio = action.payload;
    },
    deselectPortfolio: state => {
      state.selectedPortfolio = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(asyncFetchUser.fulfilled, (state, action) => {
      const { userInfo, portfolios, investments, stocks } = action.payload;
      state.userInfo = userInfo;
      state.portfolios = portfolios;
      state.investments = investments;
      state.stocks = stocks;

      // update selected portfolio with recently fetched portfolios data
      if (state.selectedPortfolio) {
        const updatedPortfolio = portfolios.find(
          portfolio => portfolio.id === state.selectedPortfolio?.id
        );
        if (updatedPortfolio) {
          state.selectedPortfolio = updatedPortfolio;
        }
      }
    });
  },
});

export const { selectPortfolio, deselectPortfolio } = userSlice.actions;

export const getUser = (state: RootState) => state.userReducer;
export const getPortfolios = (state: RootState) => state.userReducer.portfolios;
export const getSelectedPortfolio = (state: RootState) =>
  state.userReducer.selectedPortfolio;
export const getInvestments = (state: RootState) =>
  state.userReducer.investments;
export const getStocks = (state: RootState) => state.userReducer.stocks;

export default userSlice.reducer;
