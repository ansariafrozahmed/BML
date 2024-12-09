// src/store.ts
import { configureStore } from "@reduxjs/toolkit";
import userProfile from "./userProfile";
import gallerySlice from "./gallerySlice";

// Configure and export the Redux store
export const store = configureStore({
  reducer: {
    userProfile,
    gallerySlice,
  },
});

// Export RootState and AppDispatch types for TypeScript support
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
