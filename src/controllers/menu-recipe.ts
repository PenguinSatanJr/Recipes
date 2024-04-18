import Router from '@koa/router';
import { Context } from 'koa';
import dataSource from '../data-source';
import {
  createMenuRecipeBodySchema,
  getMenuRecipesQuerySchema,
} from '../api/request-schemas';
import MenuRecipe from '../entity/menu-recipe';
import { menuRecipeApiFilter } from '../api/response-schemas';

const menuRecipeRouter = new Router({ prefix: '/menu-recipe' });

const getMenuRecipes = async (ctx: Context) => {
  const { menuId } = getMenuRecipesQuerySchema.parse(ctx.query);

  const repository = dataSource.getRepository(MenuRecipe);

  const recipes = await repository.find({
    where: { menuId },
    relations: { recipe: true },
  });

  ctx.status = 200;
  ctx.body = recipes.map(menuRecipeApiFilter);
};

const createMenuRecipe = async (ctx: Context) => {
  const { menuId, recipeId, weekDay, mealTime } =
    createMenuRecipeBodySchema.parse(ctx.request.body);

  const repository = dataSource.getRepository(MenuRecipe);

  const recipe = await repository.save(
    repository.create({
      menuId,
      recipeId,
      weekDay,
      mealTime,
    }),
  );

  ctx.status = 201;
  ctx.body = menuRecipeApiFilter(recipe);
};

menuRecipeRouter.get('/', getMenuRecipes);
menuRecipeRouter.post('/', createMenuRecipe);

export default menuRecipeRouter;
