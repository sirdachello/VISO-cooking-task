import { createContext, useContext } from "react";
import { Meal } from "../types/types";

interface FavoriteContextType {
  favorites: Meal[];
  setFavorites: React.Dispatch<React.SetStateAction<Meal[]>>;
  toggleFavorites: (meal: Meal) => void;
}

export const FavoriteContext = createContext<FavoriteContextType | undefined>(
  undefined
);

export function useFavoriteContext() {
  const context = useContext(FavoriteContext);
  if (context === undefined)
    throw new Error(
      "useFavoriteContext must be used with FavoriteContext.Provider value"
    );

  return context;
}
