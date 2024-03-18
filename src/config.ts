import { DataSourceOptions } from 'typeorm';
import Recipe from './entity/recipe';
import migrations from './migrations';

type Config = {
  db: DataSourceOptions;
};

const config: Config = {
  db: {
    type: 'postgres',
    host: 'localhost',
    entities: [Recipe],
    port: 5432,
    username: 'penguin',
    password: 'penguin',
    database: 'recipes',
    logging: false,
    migrations,
  },
};

export default config;
