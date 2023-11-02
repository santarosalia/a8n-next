import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { decodeJwt } from "@/app/lib/jwt";

export type UserState = {
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
    isLoading: boolean
};

const initialState: UserState = {
    user : null,
    isLoading : true
};
const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  },
});

export default slice;
export const { setUser, setIsLoading } = slice.actions;
export const getUser = (state: RootState) => state.user.user;
export const getIsLoading = (state: RootState) => state.user.isLoading;