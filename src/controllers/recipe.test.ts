import { Server } from 'http';
import supertest from 'supertest';
import dataSource from '../data-source';
import initKoaApp from '../init-koa-app';
import Recipe from '../entity/recipe';

describe('/api/recipe', () => {
  let result: supertest.Response;
  let app: Server;
  let request: ReturnType<typeof supertest>;
  const path = '/api/recipe';
  const repository = dataSource.getRepository(Recipe);

  beforeAll(async () => {
    app = initKoaApp().listen();
    request = supertest(app);
  });

  afterAll(() => app.close());

  afterEach(async () => {
    await repository.delete({});
  });

  describe('POST', () => {
    const recipe = {
      title: 'Newly created recipe',
      description: 'Description',
    };

    describe('when title and description are valid', () => {
      beforeEach(async () => {
        result = await request.post(path).send(recipe);
      });

      it('should return 201 status code', () => {
        expect(result.status).toBe(201);
      });

      it('should return created recipe', () => {
        expect(result.body).toEqual({
          id: expect.any(Number),
          title: recipe.title,
          description: recipe.description,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        });
      });
    });

    describe('when recipe body is invalid cause', () => {
      describe.each`
        testDescription                  | title              | description         | expectedMessage
        ${'title is empty string'}       | ${''}              | ${'Description'}    | ${'title: String must contain at least 1 character(s)'}
        ${'title is too long'}           | ${'a'.repeat(256)} | ${'Description'}    | ${'title: String must contain at most 255 character(s)'}
        ${'title is missing'}            | ${undefined}       | ${'Description'}    | ${'title: Required'}
        ${'description is empty string'} | ${'Title'}         | ${''}               | ${'description: String must contain at least 1 character(s)'}
        ${'description is too long'}     | ${'Title'}         | ${'a'.repeat(1001)} | ${'description: String must contain at most 1000 character(s)'}
        ${'description is missing'}      | ${'Title'}         | ${undefined}        | ${'description: Required'}
      `('$testDescription', ({ title, description, expectedMessage }) => {
        beforeEach(async () => {
          result = await request.post(path).send({ title, description });
        });

        it('should return 400 status code', () => {
          expect(result.status).toBe(400);
        });

        it('should return error message', () => {
          expect(result.text).toEqual(expectedMessage);
        });
      });
    });
  });
});
