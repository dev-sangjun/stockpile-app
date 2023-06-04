import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { Stock } from "../types/entity.types";
import { fetchStocksByUserId, fetchStockSymbols } from "../api/stock.api";

export interface Stocks {
  [key: string]: Stock; // key: stock symbol, value: price
}

interface StocksState {
  stocks: Stocks;
  symbols: string[];
}

const initialState: StocksState = {
  stocks: {},
  symbols: [],
};

export const asyncFetchStocks = createAsyncThunk(
  "stocks/asyncFetchStocks",
  async (userId: string) => {
    const stocks = await fetchStocksByUserId(userId);
    return stocks;
  }
);

export const asyncFetchSymbols = createAsyncThunk(
  "stocks/asyncFetchSymbols",
  async () => {
    const symbols = await fetchStockSymbols();
    return symbols;
  }
);

export const stocksSlice = createSlice({
  name: "stocks",
  initialState,
  reducers: {
    updateStocks: (state, action: PayloadAction<Stocks>) => {
      state.stocks = action.payload;
    },
    updateSymbols: (state, action: PayloadAction<string[]>) => {
      state.symbols = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(asyncFetchStocks.fulfilled, (state, action) => {
      state.stocks = action.payload;
    });
    builder.addCase(asyncFetchSymbols.fulfilled, (state, action) => {
      state.symbols = action.payload;
    });
  },
});

export const { updateStocks, updateSymbols } = stocksSlice.actions;

export const getStocks = (state: RootState) => state.stocksReducer.stocks;

export const getSymbols = (state: RootState) => state.stocksReducer.symbols;

export default stocksSlice.reducer;
