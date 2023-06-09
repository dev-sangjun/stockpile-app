import { configureStore } from "@reduxjs/toolkit";
import stocksReducer from "./stocks.reducer";
import userReducer from "./user.reducer";

export const store = configureStore({
  reducer: {
    stocksReducer,
    userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
