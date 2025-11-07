// favoritesSlice.ts
import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: { favorites: [] },
  reducers: {
    toggleFavorite: (state, action) => {
      // logic
    },
  },
});

export default favoritesSlice.reducer; // ✅ default export
