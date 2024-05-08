import { Context } from 'koa';
import { ZodError } from 'zod';
import zodMiddleware from './zod-middleware';

describe('zodMiddleware()', () => {
  const nextMock = jest.fn();

  const contextMock = {
    method: 'GET',
    URL: {
      pathname: 'some/path',
      search: '?someSearch',
    },
    status: 200,
    throw: jest.fn(),
  } as unknown as Context;

  describe('when thrown error is not a zod error', () => {
    const error = new Error('Some error');

    beforeEach(() => {
      nextMock.mockRejectedValue(error);
    });

    it('throws caught error', async () => {
      await expect(zodMiddleware(contextMock, nextMock)).rejects.toBe(error);
    });
  });

  describe.each`
    zodIssuePath           | expectedMessage
    ${['path', 'subPath']} | ${'path.subPath: Some error'}
    ${['path']}            | ${'path: Some error'}
    ${[]}                  | ${'Some error'}
  `(
    'when thrown error is a zod error with path $zodIssuePath',
    ({ zodIssuePath, expectedMessage }) => {
      beforeEach(async () => {
        const zodError = new ZodError([
          {
            code: 'invalid_type',
            expected: 'string',
            received: 'number',
            path: zodIssuePath,
            message: 'Some error',
          },
        ]);

        nextMock.mockRejectedValue(zodError);

        await zodMiddleware(contextMock, nextMock);
      });

      it('calls ctx.throw with correct params', () => {
        expect(contextMock.throw).toBeCalledWith(400, expectedMessage);
      });
    },
  );

  describe('when zod error has multiple issues', () => {
    beforeEach(async () => {
      const zodError = new ZodError([
        {
          code: 'invalid_type',
          expected: 'string',
          received: 'number',
          path: ['somePath1'],
          message: 'Some error 1',
        },
        {
          code: 'invalid_type',
          expected: 'string',
          received: 'number',
          path: ['somePath2'],
          message: 'Some error 2',
        },
      ]);

      nextMock.mockRejectedValue(zodError);

      await zodMiddleware(contextMock, nextMock);
    });

    it('calls ctx.throw with correct params', () => {
      expect(contextMock.throw).toBeCalledWith(
        400,
        'somePath1: Some error 1\nsomePath2: Some error 2',
      );
    });
  });
});
