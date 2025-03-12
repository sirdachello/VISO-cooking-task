import { Meal, MealCategory } from "../types/types";

export default async function fetchMealsData() {
    const categoriesResponse = await fetch(
      "https://www.themealdb.com/api/json/v1/1/list.php?c=list"
    );
    const categoriesResult = await categoriesResponse.json();
    const categoriesArray = categoriesResult.meals.map(
      (category: MealCategory) => category.strCategory
    );
    // now we have an array of categories
    const arrOfPromises = categoriesArray.map((category: string) =>
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        .then((res) => res.json())
        .then((data) => ({
          [category]: data.meals.map((meal: Meal) => ({
            ...meal,
            isFavotire: false,
            category,
          })),
        }))
    );
    const result = await Promise.all(arrOfPromises);
    return result;
  }