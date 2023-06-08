import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.reducer";
import stocksReducer from "./stocks.reducer";
import userReducer from "./user.reducer";

export const store = configureStore({
  reducer: {
    authReducer,
    stocksReducer,
    userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
