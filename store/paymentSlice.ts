import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  paymentModal: false,
};
const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    togglePaymentModal: (state) => {
      state.paymentModal = !state.paymentModal;
    },
    closeModal: (state) => {
      state.paymentModal = false;
    },
  },
});

export const { togglePaymentModal, closeModal } = paymentSlice.actions;
export default paymentSlice.reducer;
