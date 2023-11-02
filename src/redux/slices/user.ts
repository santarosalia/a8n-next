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
    accessToken: string | null
    isLoading: boolean
};

const initialState: UserState = {
    user : null,
    accessToken : null,
    isLoading : true
};
const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAccessToken: (state, action) => {
      const accessToken = action.payload as string | null;
      state.accessToken = accessToken;
      const decoded = decodeJwt(accessToken!);
      const user = JSON.parse(JSON.stringify(decoded));
      state.user = user;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  },
});

export default slice;
export const { setUser, setAccessToken, setIsLoading } = slice.actions;
export const getUser = (state: RootState) => state.user.user;
export const getAccessToken = (state: RootState) => state.user.accessToken;
export const getIsLoading = (state: RootState) => state.user.isLoading;