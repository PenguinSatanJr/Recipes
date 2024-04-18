import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from '@koa/router';
import recipe from './controllers/recipe';
import zodMiddleware from './middleware/zod-middleware';
import ingredientRouter from './controllers/ingredient';
import menuRecipeRouter from './controllers/menu-recipe';

export default () => {
  const app = new Koa();

  const router = new Router({ prefix: '/api' }).use(
    recipe.routes(),
    recipe.allowedMethods(),
    ingredientRouter.routes(),
    ingredientRouter.allowedMethods(),
    menuRecipeRouter.routes(),
    menuRecipeRouter.allowedMethods(),
  );

  app
    .use(zodMiddleware)
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods());

  return app;
};
