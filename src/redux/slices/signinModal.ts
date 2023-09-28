import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  isOpen: boolean
};

const initialState: InitialState = {
  isOpen: false
};
const signinModal = createSlice({
  name: "signinModal",
  initialState,
  reducers: {
    open: (state, action) => {
      state.isOpen = true;
    },
    close: (state, action) => {
      state.isOpen = false;
    }
  },
});

export default signinModal;
export const { open, close } = signinModal.actions;