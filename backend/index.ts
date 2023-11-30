import express, { Express } from 'express';
import appLoader from './loader';
import config from './config'
const app: Express = express();

appLoader(app);

app.listen(config.port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${config.port}`);
});
