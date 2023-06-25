import { configureStore } from "@reduxjs/toolkit";
import entityReducer from "./entity.reducer";
import userReducer from "./user.reducer";

export const store = configureStore({
  reducer: {
    entityReducer,
    userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
