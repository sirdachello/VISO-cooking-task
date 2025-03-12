import { Link } from "react-router";
import { Meal } from "../types/types";
import { useFavoriteContext } from "../context/context";

type MealProps = {
  meal: Meal;
};

export default function MealCard({ meal }: MealProps) {
    const {favorites, toggleFavorites} = useFavoriteContext()

  return (
    <div className="card bg-base-300 w-80 h-80 shadow-sm">
      <figure>
        <img src={meal.strMealThumb} alt={meal.strMeal} />
      </figure>
      <div className="card-body">
        <h2 className="card-title truncate pb-3">{meal.strMeal}</h2>
        <div className="card-actions justify-end">
          <Link to={`/recipes/${meal.idMeal}`}>
            <button className="btn btn-primary">Details</button>
          </Link>
          <button onClick={() => toggleFavorites(meal)} className="btn btn-primary">
            {favorites.some(favMeal => favMeal.idMeal === meal.idMeal) ? "Remove from Favorite" : "Favorite"}
          </button>
        </div>
      </div>
    </div>
  );
}
