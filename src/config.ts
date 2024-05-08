import { DataSourceOptions } from 'typeorm';
import Recipe from './entity/recipe';
import migrations from './migrations';
import Ingredient from './entity/ingredient';
import Menu from './entity/menu';
import MenuRecipe from './entity/menu-recipe';

type Config = {
  db: DataSourceOptions;
};

const isTestEnv = process.env.NODE_ENV === 'test';

const defaultUsername = isTestEnv ? 'penguin-test' : 'penguin';

const defaultPassword = isTestEnv ? 'penguin-test' : 'penguin';

const defaultDatabase = isTestEnv ? 'recipes-test' : 'recipes';

const config: Config = {
  db: {
    type: 'postgres',
    host: process.env.TYPEORM_HOST || 'localhost',
    entities: [Recipe, Ingredient, Menu, MenuRecipe],
    port: process.env.TYPEORM_PORT
      ? parseInt(process.env.TYPEORM_PORT, 10)
      : 5432,
    username: process.env.TYPEORM_USERNAME || defaultUsername,
    password: process.env.TYPEORM_PASSWORD || defaultPassword,
    database: process.env.TYPEORM_DATABASE || defaultDatabase,
    synchronize: isTestEnv,
    logging: false,
    migrations,
  },
};

export default config;
