import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modal.reducer";
import stocksReducer from "./stocks.reducer";
import userReducer from "./user.reducer";

export const store = configureStore({
  reducer: {
    modalReducer,
    stocksReducer,
    userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
