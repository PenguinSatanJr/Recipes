import { z } from 'zod';
import { MAX_INGREDIENT_NAME_LENGTH } from '../entity/ingredient';
import {
  MAX_RECIPE_DESCRIPTION_LENGTH,
  MAX_RECIPE_TITLE_LENGTH,
} from '../entity/recipe';

const normalizeWhitespace = (value: string) =>
  value.replace(/\s+/g, ' ').trim();

const normalizedString = ({ min = 0, max }: { min?: number; max: number }) =>
  z.string().transform(normalizeWhitespace).pipe(z.string().min(min).max(max));

export const createIngredientBodySchema = z.object({
  name: normalizedString({ max: MAX_INGREDIENT_NAME_LENGTH, min: 1 }),
  calories: z.number(),
  protein: z.number(),
  fat: z.number(),
  carbs: z.number(),
});

export const createRecipeBodySchema = z.object({
  title: normalizedString({ max: MAX_RECIPE_TITLE_LENGTH, min: 1 }),
  description: normalizedString({ max: MAX_RECIPE_DESCRIPTION_LENGTH, min: 1 }),
});
