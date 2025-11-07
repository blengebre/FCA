import { createContext, useState } from "react";
import type { ReactNode } from "react";

import { useEffect } from "react";

interface FavProduct {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}

interface FavContextType {
  favorites: FavProduct[];
  toggleFavorite: (product: FavProduct) => void;
}

export const FavContext = createContext<FavContextType | null>(null);

export const FavProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<FavProduct[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Add or remove favorite
  const toggleFavorite = (product: FavProduct) => {
    const exists = favorites.some((f) => f.id === product.id);
    if (exists) {
      setFavorites(favorites.filter((f) => f.id !== product.id));
    } else {
      setFavorites([...favorites, product]);
    }
  };

  return (
    <FavContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavContext.Provider>
  );
};
