import Router from '@koa/router';
import { Context } from 'koa';
import dataSource from '../data-source';
import Recipe from '../entity/recipe';

const recipeRouter = new Router({ prefix: '/recipe' });

const getRecipes = async (ctx: Context) => {
  const repository = dataSource.getRepository(Recipe);

  const recipes = await repository.find();

  ctx.body = recipes;
  ctx.status = 200;
};

recipeRouter.get('/', getRecipes);

export default recipeRouter;
