import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { Investment } from "../types/entity.types";

export interface Investments {
  [key: string]: Investment;
}

interface InvestmentsState {
  investments: Investments;
}

const initialState: InvestmentsState = {
  investments: {},
};

export const investmentsSlice = createSlice({
  name: "investments",
  initialState,
  reducers: {
    updateInvestments: (state, action: PayloadAction<Investments>) => {
      state.investments = action.payload;
    },
  },
});

export const { updateInvestments } = investmentsSlice.actions;

export const getInvestments = (state: RootState) =>
  state.investmentsReducer.investments;

export default investmentsSlice.reducer;
