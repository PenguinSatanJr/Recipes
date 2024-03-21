import dataSource from './data-source';
import initKoaApp from './init-koa-app';

const port = 4001;

(async () => {
  await dataSource.initialize();

  initKoaApp().listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`recipes koa here on ${port} 🐧🐧🐧`);
  });
})();

export default initKoaApp;
