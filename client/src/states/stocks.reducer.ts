import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { Stock } from "../types/entity.types";

export interface Stocks {
  [key: string]: Stock; // key: stock symbol, value: price
}

interface StocksState {
  stocks: Stocks;
}

const initialState: StocksState = {
  stocks: {},
};

export const stocksSlice = createSlice({
  name: "stocks",
  initialState,
  reducers: {
    updateStocks: (state, action: PayloadAction<Stocks>) => {
      state.stocks = action.payload;
    },
  },
});

export const { updateStocks } = stocksSlice.actions;

export const getStocks = (state: RootState) => state.stocksReducer.stocks;

export default stocksSlice.reducer;
