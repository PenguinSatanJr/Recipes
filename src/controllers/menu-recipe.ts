import Router from '@koa/router';
import { Context } from 'koa';
import dataSource from '../data-source';
import {
  createMenuRecipeBodySchema,
  getMenuRecipesQuerySchema,
} from '../api/request-schemas';
import MenuRecipe from '../entity/menu-recipe';
import { menuRecipeApiFilter } from '../api/response-schemas';
import Menu from '../entity/menu';
import Recipe from '../entity/recipe';

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

  const menuRepository = dataSource.getRepository(Menu);

  const menu = await menuRepository.findOne({ where: { id: menuId } });

  if (!menu) {
    ctx.throw(404, `Menu with id ${menuId} not found`);
  }

  const recipeRepository = dataSource.getRepository(Recipe);

  const recipe = await recipeRepository.findOne({ where: { id: recipeId } });

  if (!recipe) {
    ctx.throw(404, `Recipe with id ${recipeId} not found`);
  }

  const repository = dataSource.getRepository(MenuRecipe);

  const menuRecipe = await repository.save(
    repository.create({
      menuId,
      recipeId,
      weekDay,
      mealTime,
    }),
  );

  ctx.status = 201;
  ctx.body = menuRecipeApiFilter(menuRecipe);
};

menuRecipeRouter.get('/', getMenuRecipes);
menuRecipeRouter.post('/', createMenuRecipe);

export default menuRecipeRouter;
