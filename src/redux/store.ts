import { configureStore } from "@reduxjs/toolkit";
import dialog from "./slices/dialog";

export const store = configureStore({
  reducer: {
    dialog : dialog.reducer
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;