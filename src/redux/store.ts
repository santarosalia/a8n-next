import { configureStore } from "@reduxjs/toolkit";
import dialogSlice from "./slices/dialog";
import processSlice from './slices/process';
import userSlice from './slices/user';

export const store = configureStore({
  reducer: {
    dialog : dialogSlice.reducer,
    process : processSlice.reducer,
    user : userSlice.reducer
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;