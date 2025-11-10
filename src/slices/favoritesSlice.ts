import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface FavoritesState {
  favorites: Product[];
}

const initialState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Product>) => {
      const existing = state.favorites.find((p) => p.id === action.payload.id);
      if (existing) {
        // Remove from favorites
        state.favorites = state.favorites.filter(
          (p) => p.id !== action.payload.id
        );
      } else {
        // Add to favorites
        state.favorites.push(action.payload);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
