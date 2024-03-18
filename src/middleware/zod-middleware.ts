import { Context, Next } from 'koa';
import { ZodError, ZodIssue } from 'zod';

const pathToString = (path: (string | number)[]) => path.join('.');

const zodIssueToString = ({ path, message }: ZodIssue) => {
  const pathString = pathToString(path);

  return pathString ? `${pathString}: ${message}` : message;
};

const zodMiddleware = async (ctx: Context, next: Next) => {
  try {
    await next();
  } catch (error) {
    if (error instanceof ZodError) {
      const message = error.issues.map(zodIssueToString).join('\n');

      ctx.throw(400, message);
    } else {
      throw error;
    }
  }
};

export default zodMiddleware;
