import { PayloadAction, createSlice } from "@reduxjs/toolkit";
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
  reducers: {
    updateUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
  },
});

export const { updateUserId } = authSlice.actions;

export const getUserId = (state: RootState) => state.authReducer.userId;

export default authSlice.reducer;
