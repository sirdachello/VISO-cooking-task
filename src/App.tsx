import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import Layout from "./components/Layout";
import RecipesList from "./pages/RecipesList";
import RecipeDetails from "./pages/RecipeDetails";
import FavoriteRecipes from "./pages/FavoriteRecipes";
import NotFound from "./pages/NotFound";
import { FavoriteContext } from "./context/context";
import { useState } from "react";
import { Meal } from "./types/types";

export default function App() {
  const [favorites, setFavorites] = useState<Meal[]>([])

  function toggleFavorites(meal: Meal) {
    setFavorites((prevFavorites) => {
      if(prevFavorites.some((favMeal) => favMeal.idMeal === meal.idMeal)) {
        return prevFavorites.filter((favMeal) => favMeal.idMeal !== meal.idMeal);
      } else {
        return [...prevFavorites, meal];
      }
    })
  }

  return (
    <FavoriteContext.Provider value={{favorites, setFavorites, toggleFavorites}}>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/recipes" replace />} />
        <Route path="/recipes" element={<RecipesList />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
        <Route path="/recipes/favorite" element={<FavoriteRecipes />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
    </FavoriteContext.Provider>
  );
}
