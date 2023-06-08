import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface AuthState {
  userId?: string;
}

const initialState: AuthState = {
  userId: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export const getSymbols = (state: RootState) => state.stocksReducer.symbols;

export default authSlice.reducer;
