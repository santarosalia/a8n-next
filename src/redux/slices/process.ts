import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ExecuteMessage, ProcessInfo } from "@/interface/Interface";

type InitialState = {
    action: ExecuteMessage | null
    processInfos: ProcessInfo[],
    selected: {
      [key: string] : boolean
    },
};

const initialState: InitialState = {
    action : null,
    processInfos : [],
    selected : {}
};
const slice = createSlice({
  name: "process",
  initialState,
  reducers: {
    setAction: (state, action) => {
      state.action = action.payload;
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
export const { setAction, setProcessInfos, setSelected } = slice.actions;
export const getAction = (state: RootState) => state.process.action;
export const getProcessInfos = (state: RootState) => state.process.processInfos;
export const getSelected = (state: RootState) => state.process.selected;