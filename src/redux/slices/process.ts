import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type InitialState = {
    process: any
    processes: any
};

const initialState: InitialState = {
    process : {},
    processes : []
};
const dialog = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    setProcess: (state, action) => {
      state.process = action.payload;
    },
    setProcesses: (state, action) => {
        state.processes = action.payload;
    }
  },
});

export default dialog;
export const { setProcess, setProcesses } = dialog.actions;
export const getProcess = (state: RootState) => state.process.process;
export const getProcesses = (state: RootState) => state.process.processes;