
import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "../slices/favoritesSlice";
import uiReducer from "../slices/uiSlice";
import authReducer from "../slices/authSlice"; // ✅ import authReducer  
export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    ui: uiReducer,
    auth: authReducer, // ✅ add authReducer to the store
  },
});

// Infer the `RootState` type from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
