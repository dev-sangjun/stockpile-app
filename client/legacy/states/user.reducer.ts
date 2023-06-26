import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import userAPI from "../api/user.api";
import {
  Portfolio,
  Investments,
  Stocks,
  UserInfo,
} from "../types/entity.types";
import { getInvestmentsObject, getStocksObject } from "../utils/entity.utils";
import { fetchStocksByUserId } from "../api/stock.api";
import { signOutUser } from "../api/auth.api";

interface UserState {
  userInfo: UserInfo | null;
  favoritePortfolios: string[];
  favoriteStocks: string[];
  goalAmount: number;
  portfolios: Portfolio[];
  selectedPortfolio?: Portfolio | null;
  investments: Investments;
  stocks: Stocks;
}

const initialState: UserState = {
  userInfo: null,
  favoritePortfolios: [],
  favoriteStocks: [],
  goalAmount: 0,
  portfolios: [],
  selectedPortfolio: null,
  investments: {},
  stocks: {},
};

export const asyncFetchUser = createAsyncThunk(
  "user/asyncFetchUser",
  async (): Promise<UserState> => {
    const user = await userAPI.fetchUser();
    const {
      id,
      email,
      username,
      favoritePortfolios,
      favoriteStocks,
      goalAmount,
      portfolios,
      investments,
      stocks,
    } = user;
    const userInfo: UserInfo = {
      id,
      email,
      username,
    };
    return {
      userInfo,
      favoritePortfolios,
      favoriteStocks,
      goalAmount,
      portfolios,
      investments: getInvestmentsObject(investments),
      stocks: getStocksObject(stocks),
    };
  }
);

export const asyncSignOut = createAsyncThunk(
  "user/asyncSignOut",
  async (): Promise<void> => {
    await signOutUser();
  }
);

export const asyncFetchStocks = createAsyncThunk(
  "user/asyncFetchStocks",
  async () => {
    const stocks = await fetchStocksByUserId();
    return stocks;
  }
);

export const asyncAddToFavoriteStocks = createAsyncThunk(
  "user/asyncAddToFavoriteStocks",
  async (stockId: string) => {
    const favoriteStocks = await userAPI.addToFavoriteStocks(stockId);
    return favoriteStocks;
  }
);

export const asyncDeleteFromFavoriteStocks = createAsyncThunk(
  "user/asyncDeleteFromFavoriteStocks",
  async (stockId: string) => {
    const favoriteStocks = await userAPI.deleteFromFavoriteStocks(stockId);
    return favoriteStocks;
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
    updateGoalAmount: (state, action: PayloadAction<number>) => {
      state.goalAmount = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(asyncFetchUser.fulfilled, (state, action) => {
      const {
        userInfo,
        favoritePortfolios,
        favoriteStocks,
        goalAmount,
        portfolios,
        investments,
        stocks,
      } = action.payload;
      state.userInfo = userInfo;
      state.portfolios = portfolios;
      state.favoritePortfolios = favoritePortfolios;
      state.favoriteStocks = favoriteStocks;
      state.goalAmount = goalAmount;
      state.investments = investments;
      state.stocks = stocks;

      // update selected portfolio with recently fetched portfolios data
      if (state.selectedPortfolio) {
        const updatedPortfolio = portfolios.find(
          portfolio => portfolio.id === state.selectedPortfolio?.id
        );
        if (updatedPortfolio) {
          state.selectedPortfolio = updatedPortfolio;
        } else {
          state.selectedPortfolio = null;
        }
      }
    });
    builder.addCase(asyncSignOut.fulfilled, state => {
      const {
        userInfo,
        favoritePortfolios,
        favoriteStocks,
        portfolios,
        investments,
        stocks,
      } = initialState;
      state.userInfo = userInfo;
      state.portfolios = portfolios;
      state.favoritePortfolios = favoritePortfolios;
      state.favoriteStocks = favoriteStocks;
      state.investments = investments;
      state.stocks = stocks;
    });
    builder.addCase(asyncFetchStocks.fulfilled, (state, action) => {
      state.stocks = action.payload;
    });
    builder.addCase(asyncAddToFavoriteStocks.fulfilled, (state, action) => {
      state.favoriteStocks = action.payload;
    });
    builder.addCase(
      asyncDeleteFromFavoriteStocks.fulfilled,
      (state, action) => {
        state.favoriteStocks = action.payload;
      }
    );
  },
});

export const { selectPortfolio, deselectPortfolio, updateGoalAmount } =
  userSlice.actions;

export const getUser = (state: RootState) => state.userReducer;
export const getUserInfo = (state: RootState) => state.userReducer.userInfo;
export const getFavoritePortfolios = (state: RootState) =>
  state.userReducer.favoritePortfolios;
export const getFavoriteStocks = (state: RootState) =>
  state.userReducer.favoriteStocks;
export const getGoalAmount = (state: RootState) => state.userReducer.goalAmount;
export const getPortfolios = (state: RootState) => state.userReducer.portfolios;
export const getSelectedPortfolio = (state: RootState) =>
  state.userReducer.selectedPortfolio;
export const getInvestments = (state: RootState) =>
  state.userReducer.investments;
export const getStocks = (state: RootState) => state.userReducer.stocks;
export const getUserId = (state: RootState) => state.userReducer.userInfo?.id;

export default userSlice.reducer;