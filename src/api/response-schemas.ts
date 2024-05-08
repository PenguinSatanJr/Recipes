import Ingredient from '../entity/ingredient';
import Menu from '../entity/menu';
import MenuRecipe from '../entity/menu-recipe';
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
  protein: Number(protein),
  fat: Number(fat),
  carbs: Number(carbs),
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

export const menuRecipeApiFilter = ({
  id,
  menuId,
  recipeId,
  recipe,
  weekDay,
  mealTime,
  createdAt,
}: MenuRecipe) =>
  recipe
    ? {
        id,
        menuId,
        recipeId,
        recipe: recipeApiFilter(recipe),
        weekDay,
        mealTime,
        createdAt,
      }
    : {
        id,
        menuId,
        recipeId,
        weekDay,
        mealTime,
        createdAt,
      };

export const menuApiFilter = ({ id, title, createdAt, updatedAt }: Menu) => ({
  id,
  title,
  createdAt,
  updatedAt,
});
