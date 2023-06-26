import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userAPI from "../api/user.api";
import {
  Investments,
  Portfolio,
  Stocks,
  UserInfo,
} from "../global/entity.interfaces";
import { getInvestmentsObject, getStocksObject } from "../utils/entity.utils";
import { RootState } from ".";
import authAPI from "../api/auth.api";
import { DeleteInvestmentFromPortfolioDto } from "../api/interfaces";
import investmentAPI from "../api/investment.api";

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

export const asyncSignOut = createAsyncThunk("user/asyncSignOut", async () => {
  const res = await authAPI.signOut();
  return res;
});

export const asyncAddToFavoriteStocks = createAsyncThunk(
  "user/asyncAddToFavoriteStocks",
  async (stockId: string) => {
    const res = await userAPI.addToFavoriteStocks(stockId);
    return res;
  }
);

export const asyncDeleteFromFavoriteStocks = createAsyncThunk(
  "user/asyncDeleteFromFavoriteStocks",
  async (stockId: string) => {
    const res = await userAPI.deleteFromFavoriteStocks(stockId);
    return res;
  }
);

export const asyncDeleteInvestmentFromPortfolio = createAsyncThunk(
  "user/asyncDeleteInvestmentFromPortfolio",
  async (
    dto: DeleteInvestmentFromPortfolioDto
  ): Promise<{
    success: boolean;
    data?: {
      portfolioId: string;
      investmentId: string;
    };
  }> => {
    const res = await investmentAPI.deleteInvestmentFromPortfolio(dto);
    if (res.success) {
      const { portfolioId, investmentId } = dto;
      return {
        success: res.success,
        data: {
          portfolioId,
          investmentId,
        },
      };
    }
    return {
      success: false,
    };
  }
);

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
    builder.addCase(asyncAddToFavoriteStocks.fulfilled, (state, action) => {
      state.favoriteStocks = action.payload;
    });
    builder.addCase(
      asyncDeleteFromFavoriteStocks.fulfilled,
      (state, action) => {
        state.favoriteStocks = action.payload;
      }
    );
    builder.addCase(
      asyncDeleteInvestmentFromPortfolio.fulfilled,
      (state, action) => {
        const { success, data } = action.payload;
        if (success && data) {
          const { portfolioId, investmentId } = data;
          const updatedPortfolios = state.portfolios.map(portfolio => {
            if (portfolio.id !== portfolioId) {
              return portfolio;
            }
            const updatedInvestments = portfolio.investments.filter(
              ({ id }) => id !== investmentId
            );
            return {
              ...portfolio,
              investments: updatedInvestments,
            };
          });
          console.log("updated portfolios", updatedPortfolios);
          state.portfolios = updatedPortfolios;
        }
      }
    );
  },
});

export const getUser = (state: RootState) => state.userReducer;

export default userSlice.reducer;
