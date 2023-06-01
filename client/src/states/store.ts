import { configureStore } from "@reduxjs/toolkit";
import stocksReducer from "./stocks.reducer";
export const store = configureStore({
  reducer: {
    stocksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
