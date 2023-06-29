import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  Investments,
  Portfolio,
  Stocks,
  UserInfo,
} from "../global/entity.interfaces";
import { getInvestmentsObject, getStocksObject } from "../utils/entity.utils";
import { RootState } from ".";
import { authAPI, userAPI } from "../api";

interface UserState {
  userInfo: UserInfo | null;
  favoriteStocks: string[];
  goalAmount: number;
  portfolios: Portfolio[];
  investments: Investments;
  stocks: Stocks;
}

const initialState: UserState = {
  userInfo: null,
  favoriteStocks: [],
  goalAmount: 0,
  portfolios: [],
  investments: {},
  stocks: {},
};

export const asyncFetchUser = createAsyncThunk(
  "user/asyncFetchUser",
  async () => {
    const user = await userAPI.fetchUser();
    const {
      id,
      email,
      username,
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
      favoriteStocks,
      goalAmount,
      portfolios,
      investments: getInvestmentsObject(investments),
      stocks: getStocksObject(stocks),
    };
  }
);

export const asyncSignOut = createAsyncThunk("user/asyncSignOut", async () => {
  const res = await authAPI.signOut();
  return res;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(asyncFetchUser.fulfilled, (state, action) => {
      const {
        userInfo,
        favoriteStocks,
        goalAmount,
        portfolios,
        investments,
        stocks,
      } = action.payload;
      state.userInfo = userInfo;
      state.portfolios = portfolios;
      state.favoriteStocks = favoriteStocks;
      state.goalAmount = goalAmount;
      state.investments = investments;
      state.stocks = stocks;
    });
    builder.addCase(asyncSignOut.fulfilled, (state, action) => {
      if (action.payload.success) {
        const {
          userInfo,
          favoriteStocks,
          goalAmount,
          portfolios,
          investments,
          stocks,
        } = initialState;
        state.userInfo = userInfo;
        state.portfolios = portfolios;
        state.favoriteStocks = favoriteStocks;
        state.goalAmount = goalAmount;
        state.investments = investments;
        state.stocks = stocks;
      }
    });
  },
});

export const getUser = (state: RootState) => state.userReducer;

export default userSlice.reducer;
