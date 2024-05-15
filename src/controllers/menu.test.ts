import { Server } from 'http';
import supertest from 'supertest';
import dataSource from '../data-source';
import initKoaApp from '../init-koa-app';
import Menu from '../entity/menu';

describe('/api/menu', () => {
  let result: supertest.Response;
  let app: Server;
  let request: ReturnType<typeof supertest>;
  const path = '/api/menu';
  const repository = dataSource.getRepository(Menu);

  const menu = { title: 'Newly created menu' };

  beforeAll(async () => {
    app = initKoaApp().listen();
    request = supertest(app);
  });

  afterAll(() => app.close());

  afterEach(async () => {
    await repository.delete({});
  });

  describe('POST', () => {
    describe('when title is valid', () => {
      beforeEach(async () => {
        result = await request.post(path).send(menu);
      });

      it('should return 201 status code', () => {
        expect(result.status).toBe(201);
      });

      it('should return created menu', () => {
        expect(result.body).toEqual({
          id: expect.any(Number),
          title: menu.title,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        });
      });
    });

    describe('when menu body is invalid cause', () => {
      describe.each`
        description                | title              | expectedMessage
        ${'title is empty string'} | ${''}              | ${'title: String must contain at least 1 character(s)'}
        ${'title is too long'}     | ${'a'.repeat(256)} | ${'title: String must contain at most 255 character(s)'}
        ${'title is missing'}      | ${undefined}       | ${'title: Required'}
      `('$description', ({ title, expectedMessage }) => {
        beforeEach(async () => {
          result = await request.post(path).send({ title });
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

  describe('DELETE', () => {
    describe('when menu exists', () => {
      beforeEach(async () => {
        const { id } = await repository.save(repository.create(menu));
        result = await request.delete(`${path}/${id}`);
      });

      it('should return 204 status code', () => {
        expect(result.status).toBe(204);
      });

      it('should delete menu', async () => {
        const menus = await repository.find();
        expect(menus.length).toBe(0);
      });
    });

    describe('when menu does not exist', () => {
      beforeEach(async () => {
        result = await request.delete(`${path}/100`);
      });

      it('should return 404 status code', () => {
        expect(result.status).toBe(404);
      });

      it('should return error message', () => {
        expect(result.text).toEqual('Menu with id 100 not found');
      });
    });
  });
});
