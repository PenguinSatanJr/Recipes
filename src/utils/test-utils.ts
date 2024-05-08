import Ingredient from '../entity/ingredient';
import Menu from '../entity/menu';
import Recipe from '../entity/recipe';

export const ingredient = {
  name: 'Apple',
  calories: 52,
  protein: 0.3,
  fat: 0.2,
  carbs: 13.8,
};

export const getIngredientArray = (
  length: number,
  overrides?: Partial<Ingredient>,
) =>
  Array.from({ length }, (_, i) => ({
    ...ingredient,
    name: `${ingredient.name}-${i}`,
    ...overrides,
  }));

export const recipe = {
  title: 'Apple Pie ',
  description: 'Very tasty and sweet ',
};

export const getRecipeArray = (length: number, overrides?: Partial<Recipe>) =>
  Array.from({ length }, (_, i) => ({
    ...recipe,
    title: `${recipe.title}${i + 1}`,
    description: `${recipe.description}${i + 1}`,
    ...overrides,
  }));

export const menu = {
  title: 'Menu number ',
};

export const getMenuArray = (length: number, overrides?: Partial<Menu>) =>
  Array.from({ length }, (_, i) => ({
    ...menu,
    title: `${menu.title}${i + 1}`,
    ...overrides,
  }));

export const weekDays = `'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'`;

export const mealTimes = `'Breakfast' | 'Lunch' | 'Dinner'`;
