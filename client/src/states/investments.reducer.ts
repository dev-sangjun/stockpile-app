import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { Investment } from "../types/entity.types";
import { fetchInvestments } from "../api/user.api";
import { getInvestmentsObject } from "../utils/entity.utils";

export interface Investments {
  [key: string]: Investment;
}

interface InvestmentsState {
  investments: Investments;
}

const initialState: InvestmentsState = {
  investments: {},
};

export const asyncFetchInvestments = createAsyncThunk(
  "investments/asyncFetchInvestments",
  async (userId: string) => {
    const investments = await fetchInvestments(userId);
    const investmentsObject: Investments = getInvestmentsObject(investments);
    return investmentsObject;
  }
);

export const investmentsSlice = createSlice({
  name: "investments",
  initialState,
  reducers: {
    updateInvestments: (state, action: PayloadAction<Investments>) => {
      state.investments = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(asyncFetchInvestments.fulfilled, (state, action) => {
      state.investments = action.payload;
    });
  },
});

export const { updateInvestments } = investmentsSlice.actions;

export const getInvestments = (state: RootState) =>
  state.investmentsReducer.investments;

export default investmentsSlice.reducer;
