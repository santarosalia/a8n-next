import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ExecuteMessage } from "@/interface/Interface";

type InitialState = {
    process: ExecuteMessage | null
    processes: ExecuteMessage[]
};

const initialState: InitialState = {
    process : null,
    processes : []
};
const slice = createSlice({
  name: "process",
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

export default slice;
export const { setProcess, setProcesses } = slice.actions;
export const getProcess = (state: RootState) => state.process.process;
export const getProcesses = (state: RootState) => state.process.processes;