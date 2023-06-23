import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { fetchStockSymbols } from "../api/stock.api";

interface StocksState {
  symbols: string[];
}

const initialState: StocksState = {
  symbols: [],
};

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
  reducers: {},
  extraReducers: builder => {
    builder.addCase(asyncFetchSymbols.fulfilled, (state, action) => {
      state.symbols = action.payload;
    });
  },
});

export const getSymbols = (state: RootState) => state.stocksReducer.symbols;

export default stocksSlice.reducer;
