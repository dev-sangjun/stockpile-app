import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import stockAPI from "../api/stock.api";
import { RootState } from ".";

interface StocksState {
  symbols: string[];
}

const initialState: StocksState = {
  symbols: [],
};

export const asyncFetchSymbols = createAsyncThunk(
  "stocks/asyncFetchSymbols",
  async () => {
    const symbols = await stockAPI.fetchStockSymbols();
    return symbols;
  }
);

export const stocksSlice = createSlice({
  name: "stocks",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      asyncFetchSymbols.fulfilled,
      (state, action: PayloadAction<string[]>) => {
        state.symbols = action.payload;
      }
    );
  },
});

export const getSymbols = (state: RootState) => state.stocksReducer.symbols;

export default stocksSlice.reducer;
