import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type InitialState = {
  isOpenSigninDialog: boolean
};

const initialState: InitialState = {
  isOpenSigninDialog: false
};
const dialog = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    setIsOpenSigninDialog: (state, action) => {
      state.isOpenSigninDialog = action.payload as boolean;
    }
  },
});

export default dialog;
export const { setIsOpenSigninDialog } = dialog.actions;
export const getIsOpenSigninDialog =  (state: RootState) => state.dialog.isOpenSigninDialog;