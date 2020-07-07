import { App } from './app/app';

(async () => {
  const app = new App();
  await app.exec();
})();

process.on('exit', console.log);
