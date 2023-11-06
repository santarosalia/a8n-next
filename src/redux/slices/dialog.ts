import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type InitialState = {
  isOpenEditor: boolean
};

const initialState: InitialState = {
  isOpenEditor: false
};
const slice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    setIsOpenEditor: (state, action) => {
      state.isOpenEditor = action.payload as boolean;
    }
  },
});

export default slice;
export const { setIsOpenEditor } = slice.actions;
export const getIsOpenEditor =  (state: RootState) => state.dialog.isOpenEditor;