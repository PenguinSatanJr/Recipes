import Router from '@koa/router';
import { Context } from 'koa';
import dataSource from '../data-source';
import { createIngredientBodySchema } from '../api/request-schemas';
import Ingredient from '../entity/ingredient';
import { ingredientApiFilter } from '../api/response-schemas';

const ingredientRouter = new Router({ prefix: '/ingredient' });

const getIngredients = async (ctx: Context) => {
  const repository = dataSource.getRepository(Ingredient);

  const ingredients = await repository.find();

  ctx.body = ingredients.map(ingredientApiFilter);
  ctx.status = 200;
};

const createIngredient = async (ctx: Context) => {
  const { name, calories, protein, fat, carbs } =
    createIngredientBodySchema.parse(ctx.request.body);

  const repository = dataSource.getRepository(Ingredient);

  const ingredient = repository.create({
    name,
    calories,
    protein,
    fat,
    carbs,
  });

  const createdIngredient = await repository.save(ingredient);

  ctx.status = 201;
  ctx.body = ingredientApiFilter(createdIngredient);
};

ingredientRouter.get('/', getIngredients);
ingredientRouter.post('/', createIngredient);

export default ingredientRouter;
