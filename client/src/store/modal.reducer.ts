import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

export type ModalType =
  | "ADD_PORTFOLIO"
  | "UPDATE_PORTFOLIO"
  | "DELETE_PORTFOLIO"
  | "ADD_INVESTMENT"
  | "UPDATE_INVESTMENT"
  | "DELETE_INVESTMENT"
  | "SIGN_OUT";

interface ModalState {
  type: ModalType | null;
}

const initialState: ModalState = {
  type: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalType>) => {
      state.type = action.payload;
    },
    closeModal: state => {
      state.type = initialState.type;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export const getModalType = (state: RootState) => state.modalReducer.type;

export default modalSlice.reducer;
