import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import Error from "../components/Error";
import { MealDetailed } from "../types/types";

async function fetchRecipe(id: string) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const result = await response.json();
  return result.meals as MealDetailed[];
}

export default function RecipeDetails() {
  const { id } = useParams();

  const { data, isPending, error } = useSuspenseQuery({
    queryKey: ["recipe"],
    queryFn: () => fetchRecipe(`${id}`),
  });

  const meal = data[0];
  const ingredients = Object.keys(meal)
    .filter(
      (key) =>
        key.startsWith("strIngredient") && meal[key as keyof MealDetailed]
    )
    .map((key, index) => ({
      ingredient: meal[key as keyof MealDetailed],
      measure: meal[`strMeasure${index + 1}` as keyof MealDetailed],
    }));

  return (
    <div className="my-5 mx-[20px]">
      {isPending && <span className="loading loading-dots loading-xl"></span>}
      {error && <Error message={error.message} />}
      <>
        <div className="flex justify-around items-center flex-wrap">
          <div className="card bg-base-100 w-96 shadow-sm">
            <figure>
              <img src={meal.strMealThumb} alt={meal.strMeal} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{meal.strMeal}</h2>
              <ul className="mt-6 flex flex-col gap-2 text-xs">
                <li className="flex items-center gap-4">
                  <div className="badge badge-warning mr-1">Cuisine:</div>{" "}
                  <div className="badge badge-info mr-1">{meal.strArea}</div>
                </li>
                <li className="flex items-center gap-4">
                  <div className="badge badge-warning mr-1">Category:</div>{" "}
                  <div className="badge badge-info mr-1">
                    {meal.strCategory}
                  </div>
                </li>
                {meal.strTags && (
                  <li className="flex items-center gap-4">
                    <div className="badge badge-warning mr-1">Tags:</div>{" "}
                    {meal.strTags.split(",").map((tag, index) => (
                      <div key={index} className="badge badge-info">
                        {tag}
                      </div>
                    ))}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col">
          <div className="divider">Ingredients</div>
          <ul className="mt-6 flex flex-wrap justify-center gap-2 text-md">
            {ingredients.map(({ ingredient, measure }, index) => (
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
        <div className="flex w-full flex-col">
          <div className="divider">Preparation</div>
          <p className="text-justify">{meal.strInstructions}</p>
        </div>
        {meal.strYoutube && (
          <>
            <div className="divider">Video Guide</div>
            <div className="flex justify-center items-center py-5">
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${meal.strYoutube.split("v=")[1]}`}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Video Guide"
              ></iframe>
            </div>
          </>
        )}
      </>
    </div>
  );
}
