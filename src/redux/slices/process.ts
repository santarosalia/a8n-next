import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ExecuteMessage, ProcessInfo } from "@/interface/Interface";

type InitialState = {
    process: ExecuteMessage | null
    processInfos: ProcessInfo[],
    selected: {
      [key: string] : boolean
    }
};

const initialState: InitialState = {
    process : null,
    processInfos : [],
    selected : {}
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
    },
    setSelected: (state, action) => {
      state.selected = action.payload;
    }
  },
});

export default slice;
export const { setProcess, setProcessInfos, setSelected } = slice.actions;
export const getProcess = (state: RootState) => state.process.process;
export const getProcessInfos = (state: RootState) => state.process.processInfos;
export const getSelected = (state: RootState) => state.process.selected;