import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import MealCard from "../components/MealCard";
import { categories, Meal } from "../types/types";
import fetchMealsData from "../lib/fetchMealsData";
import Pagination from "../components/Pagination";
import getPageNumbers from "../lib/getPageNumbers";

const ITEMS_PER_PAGE = 10;

export default function RecipesList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState('');

  const { data, isPending } = useSuspenseQuery({
    queryKey: ["mealsData"],
    queryFn: fetchMealsData,
  });

  const mergedData = Object.assign({}, ...data);

  const flattenMeals: Meal[] = Object.entries(mergedData).flatMap(
    ([category, meals]) =>
      (meals as Meal[]).map((meal: Meal) => ({ ...meal, category }))
  ).filter(meal => {
    if(categoryFilter === "all" || categoryFilter === '') {
      return meal;
    } else {
      return meal.category === categoryFilter;
    }
  });

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const totalPages = Math.ceil(flattenMeals.length / ITEMS_PER_PAGE);
  const currentMeals = flattenMeals.slice(startIndex, endIndex);

  function changePage(page: number) {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  }

  const pageNumbers = getPageNumbers(totalPages, currentPage);

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
            return <option key={category} value={category}>{category}</option>;
          })}
        </select>
      </div>
      <ul className="flex flex-wrap justify-center gap-4">
        {isPending && <span className="loading loading-spinner loading-lg"></span>}
        {currentMeals.map((meal) => {
          return (
            <li key={meal.idMeal}>
              <MealCard meal={meal} />
            </li>
          );
        })}
      </ul>
      <Pagination
        changePage={changePage}
        currentPage={currentPage}
        pageNumbers={pageNumbers}
        totalPages={totalPages}
      />
    </div>
  );
}
