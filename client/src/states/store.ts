import { configureStore } from "@reduxjs/toolkit";
import stocksReducer from "./stocks.reducer";
import portfoliosReducer from "./portfolios.reducer";
import investmentsReducer from "./investments.reducer";

export const store = configureStore({
  reducer: {
    stocksReducer,
    portfoliosReducer,
    investmentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
