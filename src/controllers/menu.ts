import Router from '@koa/router';
import { Context } from 'koa';
import dataSource from '../data-source';
import {
  createMenuBodySchema,
  idPathParamSchema,
} from '../api/request-schemas';
import { menuApiFilter } from '../api/response-schemas';
import Menu from '../entity/menu';

const menuRouter = new Router({ prefix: '/menu' });

const createMenu = async (ctx: Context) => {
  const { title } = createMenuBodySchema.parse(ctx.request.body);

  const repository = dataSource.getRepository(Menu);

  const menu = await repository.save(
    repository.create({
      title,
    }),
  );

  ctx.status = 201;
  ctx.body = menuApiFilter(menu);
};

const deleteMenu = async (ctx: Context) => {
  const { id } = idPathParamSchema.parse(ctx.params);

  const repository = dataSource.getRepository(Menu);

  const menu = await repository.findOneBy({ id });

  if (!menu) {
    ctx.throw(404, `Menu with id ${id} not found`);
  }

  await repository.delete(id);

  ctx.status = 204;
};

menuRouter.post('/', createMenu);
menuRouter.delete('/:id', deleteMenu);

export default menuRouter;
