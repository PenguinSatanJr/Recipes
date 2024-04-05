import Router from '@koa/router';
import { Context } from 'koa';
import dataSource from '../data-source';
import Recipe from '../entity/recipe';
import { createRecipeBodySchema } from '../api/request-schemas';
import { recipeApiFilter } from '../api/response-schemas';

const recipeRouter = new Router({ prefix: '/recipe' });

const getRecipes = async (ctx: Context) => {
  const repository = dataSource.getRepository(Recipe);

  const recipes = await repository.find();

  ctx.body = recipes;
  ctx.status = 200;
};

const createRecipe = async (ctx: Context) => {
  const { title, description } = createRecipeBodySchema.parse(ctx.request.body);

  const repository = dataSource.getRepository(Recipe);

  const recipe = repository.create({
    title,
    description,
  });

  const createdRecipe = await repository.save(recipe);

  ctx.status = 201;
  ctx.body = recipeApiFilter(createdRecipe);
};

recipeRouter.get('/', getRecipes);
recipeRouter.post('/', createRecipe);

export default recipeRouter;
