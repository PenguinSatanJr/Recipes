import { Server } from 'http';
import supertest from 'supertest';
import dataSource from '../data-source';
import initKoaApp from '../init-koa-app';
import Ingredient from '../entity/ingredient';
import { getIngredientArray } from '../utils/test-utils';

describe('/api/ingredient', () => {
  let result: supertest.Response;
  let app: Server;
  let request: ReturnType<typeof supertest>;
  const path = '/api/ingredient';
  const repository = dataSource.getRepository(Ingredient);

  beforeAll(async () => {
    app = initKoaApp().listen();
    request = supertest(app);
  });

  afterAll(() => app.close());

  afterEach(async () => {
    await repository.delete({});
  });

  describe('GET', () => {
    const ingredients = getIngredientArray(3);

    beforeEach(async () => {
      await repository.save(ingredients);
      result = await request.get(path);
    });

    it('returns status code 200', () => {
      expect(result.status).toBe(200);
    });

    it('returns correct data', () => {
      expect(result.body).toEqual(
        ingredients.map((ingredient) => ({
          ...ingredient,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        })),
      );
    });
  });

  describe('POST', () => {
    const ingredient = {
      name: 'Apple',
      calories: 52,
      protein: 0.3,
      fat: 0.2,
      carbs: 13.8,
    };

    describe('when body is valid', () => {
      beforeEach(async () => {
        result = await request.post(path).send(ingredient);
      });

      it('returns status code 201', () => {
        expect(result.status).toBe(201);
      });

      it('should return created ingredient', () => {
        expect(result.body).toEqual({
          ...ingredient,
          id: expect.any(Number),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        });
      });

      it('saves ingredient to the db', async () => {
        const ingredients = await repository.find();
        expect(ingredients.length).toBe(1);
      });
    });

    describe('when body is not valid cause', () => {
      describe.each`
        description                | override                     | errorMessage
        ${'name is empty string'}  | ${{ name: '' }}              | ${'name: String must contain at least 1 character(s)'}
        ${'name is too long'}      | ${{ name: 'a'.repeat(256) }} | ${'name: String must contain at most 255 character(s)'}
        ${'name type is number'}   | ${{ name: 123 }}             | ${'name: Expected string, received number'}
        ${'name is undefined'}     | ${{ name: undefined }}       | ${'name: Required'}
        ${'calories is negative'}  | ${{ calories: -1 }}          | ${'calories: Number must be greater than or equal to 0'}
        ${'calories is too high'}  | ${{ calories: 10001 }}       | ${'calories: Number must be less than or equal to 10000'}
        ${'calories is string'}    | ${{ calories: '123' }}       | ${'calories: Expected number, received string'}
        ${'calories is undefined'} | ${{ calories: undefined }}   | ${'calories: Required'}
        ${'protein is negative'}   | ${{ protein: -1 }}           | ${'protein: Number must be greater than or equal to 0'}
        ${'protein is too high'}   | ${{ protein: 100.1 }}        | ${'protein: Nutrient weight exceeds maximum limit of 100g for ingredient'}
        ${'protein is string'}     | ${{ protein: '123.1' }}      | ${'protein: Expected number, received string'}
        ${'protein is undefined'}  | ${{ protein: undefined }}    | ${'protein: Required'}
        ${'fat is negative'}       | ${{ fat: -1 }}               | ${'fat: Number must be greater than or equal to 0'}
        ${'fat is too high'}       | ${{ fat: 100.1 }}            | ${'fat: Nutrient weight exceeds maximum limit of 100g for ingredient'}
        ${'fat is string'}         | ${{ fat: '123.1' }}          | ${'fat: Expected number, received string'}
        ${'fat is undefined'}      | ${{ fat: undefined }}        | ${'fat: Required'}
        ${'carbs is negative'}     | ${{ carbs: -1 }}             | ${'carbs: Number must be greater than or equal to 0'}
        ${'carbs is too high'}     | ${{ carbs: 100.1 }}          | ${'carbs: Nutrient weight exceeds maximum limit of 100g for ingredient'}
        ${'carbs is string'}       | ${{ carbs: '123.1' }}        | ${'carbs: Expected number, received string'}
        ${'carbs is undefined'}    | ${{ carbs: undefined }}      | ${'carbs: Required'}
      `('$description', ({ override, errorMessage }) => {
        beforeEach(async () => {
          result = await request.post(path).send({
            ...ingredient,
            ...override,
          });
        });

        it('returns status code 400', () => {
          expect(result.status).toBe(400);
        });

        it('returns error message', () => {
          expect(result.text).toEqual(errorMessage);
        });

        it('does not save ingredient to the db', async () => {
          const ingredients = await repository.find();
          expect(ingredients.length).toBe(0);
        });
      });
    });
  });
});
