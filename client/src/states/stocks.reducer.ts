import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { Stock } from "../types/entity.types";

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
});

export const { updateStocks, updateSymbols } = stocksSlice.actions;

export const getStocks = (state: RootState) => state.stocksReducer.stocks;

export const getSymbols = (state: RootState) => state.stocksReducer.symbols;

export default stocksSlice.reducer;
