import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { EntityType, Investment, Portfolio } from "../types/entity.types";

interface ModalState {
  isOpen: boolean;
  type?: "UPDATE_ENTITY" | "DELETE_ENTITY";
  payload?: Portfolio | Investment;
  payloadType?: EntityType;
}

const initialState: ModalState = {
  isOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openUpdateEntityModal: (
      state,
      action: PayloadAction<{
        entity: Portfolio | Investment;
        entityType: "Portfolio" | "Investment";
      }>
    ) => {
      state.isOpen = true;
      state.type = "UPDATE_ENTITY";
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

export const { openUpdateEntityModal, openDeleteEntityModal, closeModal } =
  modalSlice.actions;

export const getModal = (state: RootState) => state.modalReducer;

export default modalSlice.reducer;
