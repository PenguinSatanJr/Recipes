import { Server } from 'http';
import supertest from 'supertest';
import dataSource from '../data-source';
import initKoaApp from '../init-koa-app';
import MenuRecipe from '../entity/menu-recipe';
import Menu from '../entity/menu';
import Recipe from '../entity/recipe';
import {
  getMenuArray,
  getRecipeArray,
  mealTimes,
  weekDays,
} from '../utils/test-utils';
import { MealTime, WeekDay } from '../types';

describe('/api/ingredient', () => {
  let result: supertest.Response;
  let app: Server;
  let request: ReturnType<typeof supertest>;
  const path = '/api/menu-recipe';
  const menuRecipeRepository = dataSource.getRepository(MenuRecipe);
  const menuRepository = dataSource.getRepository(Menu);
  const recipeRepository = dataSource.getRepository(Recipe);

  const recipeArray = getRecipeArray(6);

  const menuArray = getMenuArray(3);

  const menuRecipe = {
    menuId: 1,
    recipeId: 1,
    weekDay: WeekDay.Monday,
    mealTime: MealTime.Breakfast,
  };

  beforeAll(async () => {
    app = initKoaApp().listen();
    request = supertest(app);
    await menuRepository.query('TRUNCATE TABLE menu RESTART IDENTITY CASCADE');
    await recipeRepository.query(
      'TRUNCATE TABLE recipe RESTART IDENTITY CASCADE',
    );
    await menuRepository.save(menuArray);
    await recipeRepository.save(recipeArray);
  });

  afterAll(() => app.close());

  afterEach(async () => {
    await menuRecipeRepository.delete({});
  });

  describe('GET', () => {
    beforeEach(async () => {
      await menuRecipeRepository.save([
        menuRecipe,
        menuRecipe,
        { ...menuRecipe, menuId: 2 },
      ]);

      result = await request.get(path).query({ menuId: 1 });
    });

    it('returns status code 200', async () => {
      expect(result.status).toBe(200);
    });

    it('returns correct menu recipes', async () => {
      expect(result.body).toEqual(
        Array.from({ length: 2 }, () => ({
          ...menuRecipe,
          id: expect.any(Number),
          recipe: expect.any(Object),
          createdAt: expect.any(String),
        })),
      );
    });
  });

  describe('POST', () => {
    describe('when menu and recipe exist', () => {
      beforeEach(async () => {
        result = await request.post(path).send(menuRecipe);
      });

      it('returns status code 201', async () => {
        expect(result.status).toBe(201);
      });

      it('returns correct menuRecipe', async () => {
        expect(result.body).toEqual({
          ...menuRecipe,
          id: expect.any(Number),
          createdAt: expect.any(String),
        });
      });
    });

    describe('when menu does not exist', () => {
      beforeEach(async () => {
        result = await request.post(path).send({
          ...menuRecipe,
          menuId: 100,
        });
      });

      it('returns status code 404', async () => {
        expect(result.status).toBe(404);
      });

      it('returns correct error message', async () => {
        expect(result.text).toBe('Menu with id 100 not found');
      });
    });

    describe('when recipe does not exist', () => {
      beforeEach(async () => {
        result = await request.post(path).send({
          ...menuRecipe,
          recipeId: 100,
        });
      });

      it('returns status code 404', async () => {
        expect(result.status).toBe(404);
      });

      it('returns correct error message', async () => {
        expect(result.text).toBe('Recipe with id 100 not found');
      });
    });

    describe('when body is not valid cause', () => {
      describe.each`
        description                | override                   | errorMessage
        ${'menuId is NaN'}         | ${{ menuId: 'string' }}    | ${'menuId: Expected number, received nan'}
        ${'menuId is undefined'}   | ${{ menuId: undefined }}   | ${'menuId: Expected number, received nan'}
        ${'recipeId is NaN'}       | ${{ recipeId: 'string' }}  | ${'recipeId: Expected number, received nan'}
        ${'recipeId is undefined'} | ${{ recipeId: undefined }} | ${'recipeId: Expected number, received nan'}
        ${'weekDay is undefined'}  | ${{ weekDay: undefined }}  | ${'weekDay: Required'}
        ${'weekDay is invalid'}    | ${{ weekDay: 'invalid' }}  | ${`weekDay: Invalid enum value. Expected ${weekDays}, received 'invalid'`}
        ${'mealTime is undefined'} | ${{ mealTime: undefined }} | ${'mealTime: Required'}
        ${'mealTime is invalid'}   | ${{ mealTime: 'invalid' }} | ${`mealTime: Invalid enum value. Expected ${mealTimes}, received 'invalid'`}
      `('$description', ({ override, errorMessage }) => {
        beforeEach(async () => {
          result = await request
            .post(path)
            .send({ ...menuRecipe, ...override });
        });

        it('returns status code 400', async () => {
          expect(result.status).toBe(400);
        });

        it('returns correct error message', async () => {
          expect(result.text).toBe(errorMessage);
        });
      });
    });
  });
});
