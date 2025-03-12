import { useFavoriteContext } from "../context/context";
import { categories, Meal } from "../types/types";
import MealCard from "../components/MealCard";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export default function FavoriteRecipes() {
  const { favorites } = useFavoriteContext();
  const [categoryFilter, setCategoryFilter] = useState("");

  async function fetchAllIngredients() {
    if (!favorites.length) return [];

    const ingredientFetches = favorites.map((meal) =>
      fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
      ).then((res) => res.json())
    );

    const mealsData = await Promise.all(ingredientFetches);

    const ingredientMap = mealsData
      .map((response) => response.meals?.[0])
      .filter(Boolean)
      .flatMap((meal) =>
        Object.keys(meal)
          .filter(
            (key) =>
              key.startsWith("strIngredient") && meal[key as keyof typeof meal]
          )
          .map((key, index) => ({
            ingredient: meal[key as keyof typeof meal],
            measure: meal[`strMeasure${index + 1}` as keyof typeof meal] || "",
          }))
      )
      .reduce((acc, { ingredient, measure }) => {
        if (acc[ingredient]) {
          acc[ingredient] += `, ${measure}`;
        } else {
          acc[ingredient] = measure;
        }
        return acc;
      }, {} as Record<string, string>);

    return Object.entries(ingredientMap).map(([ingredient, measure]) => ({
      ingredient,
      measure,
    }));
  }

  const { data, isPending } = useQuery({
    queryKey: ["favIngridients", favorites],
    queryFn: fetchAllIngredients,
  });

  return (
    <div className="">
      <div className="flex justify-center p-2">
        <select
          onChange={(e) => setCategoryFilter(e.target.value)}
          defaultValue="Select Category"
          className="select select-xs"
        >
          <option disabled>Select Category</option>
          <option value={""}>All</option>
          {categories.map((category) => {
            return (
              <option key={category} value={category}>
                {category}
              </option>
            );
          })}
        </select>
      </div>
      <ul className="flex flex-wrap justify-center gap-4">
        {favorites
          .filter((meal) => {
            if (categoryFilter === "all" || categoryFilter === "") {
              return meal;
            } else {
              return meal.category === categoryFilter;
            }
          })
          .map((meal: Meal) => {
            return (
              <li key={meal.idMeal}>
                <MealCard meal={meal} />
              </li>
            );
          })}
      </ul>
      {favorites.length > 0 && <div className="divider">Total Ingredients of All Favorite Dishes</div>}
      {isPending && (
        <div className="flex justify-center">
            <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
      <ul className="mt-6 flex flex-wrap justify-center gap-2 text-md mb-4">
        {data?.map(({ ingredient, measure }, index) => (
          <li
            key={index}
            className="flex items-center gap-2 rounded-sm p-2 nth-[even]:bg-base-300 nth-[odd]:bg-base-200"
          >
            <div>
              <img
                width={35}
                src={`http://www.themealdb.com/images/ingredients/${ingredient}-small.png`}
                alt={`${ingredient}`}
              />
            </div>
            <div>
              {ingredient}: {measure}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
