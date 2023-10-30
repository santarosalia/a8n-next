import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ExecuteMessage, ProcessInfo } from "@/interface/Interface";

type InitialState = {
    user: {
        id: string
        name: string
        email: string
        level: number
        emailVerified? : boolean
        image? : string
        createdAt: string
        updatedAt: string
    } | null
};

const initialState: InitialState = {
    user : null
};
const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export default slice;
export const { setUser } = slice.actions;
export const getUser = (state: RootState) => state.user.user;