import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Investment, Portfolio } from "../types/entity.types";

interface ModalState {
  isOpen: boolean;
  type?: "EDIT_ENTITY" | "DELETE_ENTITY";
  payload?: Portfolio | Investment;
  payloadType?: "Portfolio" | "Investment";
}

const initialState: ModalState = {
  isOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openEditEntityModal: (
      state,
      action: PayloadAction<{
        entity: Portfolio | Investment;
        entityType: "Portfolio" | "Investment";
      }>
    ) => {
      state.isOpen = true;
      state.type = "EDIT_ENTITY";
      state.payload = action.payload.entity;
      state.payloadType = action.payload.entityType;
    },
    openDeleteEntityModal: (
      state,
      action: PayloadAction<{
        entity: Portfolio | Investment;
        entityType: "Portfolio" | "Investment";
      }>
    ) => {
      state.isOpen = true;
      state.type = "DELETE_ENTITY";
      state.payload = action.payload.entity;
      state.payloadType = action.payload.entityType;
    },
    closeModal: state => {
      state.isOpen = initialState.isOpen;
      state.type = initialState.type;
      state.payload = initialState.payload;
    },
  },
});

export const openEditEntityModal = modalSlice.actions.openEditEntityModal;

export const openDeleteEntityModal = modalSlice.actions.openDeleteEntityModal;

export const closeModal = modalSlice.actions.closeModal;

export const getModal = (state: RootState) => state.modalReducer;

export default modalSlice.reducer;
