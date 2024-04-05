import Ingredient from '../entity/ingredient';
import Recipe from '../entity/recipe';

export const ingredientApiFilter = ({
  id,
  name,
  calories,
  protein,
  fat,
  carbs,
  createdAt,
  updatedAt,
}: Ingredient) => ({
  id,
  name,
  calories,
  protein,
  fat,
  carbs,
  createdAt,
  updatedAt,
});

export const recipeApiFilter = ({
  id,
  title,
  description,
  createdAt,
  updatedAt,
}: Recipe) => ({
  id,
  title,
  description,
  createdAt,
  updatedAt,
});
