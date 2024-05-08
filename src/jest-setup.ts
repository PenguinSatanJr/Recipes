import dataSource from './data-source';

beforeAll(async () => {
  await dataSource.initialize();
});

afterAll(() => dataSource.destroy());
