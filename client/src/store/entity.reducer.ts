import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Investment, Portfolio } from "../global/entity.interfaces";
import { RootState } from ".";

interface EntityState {
  selectedPortfolio: Portfolio | null;
  selectedInvestment: Investment | null;
}

const initialState: EntityState = {
  selectedPortfolio: null,
  selectedInvestment: null,
};

export const entitySlice = createSlice({
  name: "entity",
  initialState,
  reducers: {
    selectPortfolio: (state, action: PayloadAction<Portfolio>) => {
      state.selectedPortfolio = action.payload;
    },
    deselectPortfolio: state => {
      state.selectedPortfolio = null;
    },
    selectInvestment: (state, action: PayloadAction<Investment>) => {
      state.selectedInvestment = action.payload;
    },
    deselectInvestment: state => {
      state.selectedInvestment = null;
    },
  },
});

export const {
  selectPortfolio,
  deselectPortfolio,
  selectInvestment,
  deselectInvestment,
} = entitySlice.actions;

export const getEntity = (state: RootState) => state.entityReducer;

export default entitySlice.reducer;
