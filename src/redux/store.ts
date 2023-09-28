import { configureStore } from "@reduxjs/toolkit";
import signinModal from "./slices/signinModal";

export const store = configureStore({
  reducer: {
    signinModal : signinModal.reducer
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;