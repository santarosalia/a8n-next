import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type InitialState = {
  isOpenSigninDialog: boolean
};

const initialState: InitialState = {
  isOpenSigninDialog: false
};
const slice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    setIsOpenSigninDialog: (state, action) => {
      state.isOpenSigninDialog = action.payload as boolean;
    }
  },
});

export default slice;
export const { setIsOpenSigninDialog } = slice.actions;
export const getIsOpenSigninDialog =  (state: RootState) => state.dialog.isOpenSigninDialog;