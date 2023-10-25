import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ExecuteMessage, ProcessInfo } from "@/interface/Interface";

type InitialState = {
    process: ExecuteMessage | null
    processInfos: ProcessInfo[]
};

const initialState: InitialState = {
    process : null,
    processInfos : []
};
const slice = createSlice({
  name: "process",
  initialState,
  reducers: {
    setProcess: (state, action) => {
      state.process = action.payload;
    },
    setProcessInfos: (state, action) => {
        state.processInfos = action.payload;
    }
  },
});

export default slice;
export const { setProcess, setProcessInfos } = slice.actions;
export const getProcess = (state: RootState) => state.process.process;
export const getProcessInfos = (state: RootState) => state.process.processInfos;