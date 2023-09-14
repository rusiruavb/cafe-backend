import 'dotenv/config';
import express from 'express';
import sequelize from './configs/database.config';
import configs from './configs/global.config';
import logger from './utils/logger.util';
import databaseInit from './database/init.database';
import AppAPI from './api/app.api';

const bootstrap = async () => {
  const app = express();
  const { port } = configs.app;

  app.get('/', (_req, res) => {
    res.send('Hello World!');
  });

  app.use(express.json());

  app.listen(port, async () => {
    try {
      await sequelize.authenticate();
      logger.info('DB Connected');
      await databaseInit();
      logger.info('Database Synced');
      const appApi = new AppAPI(app);
      app.use(appApi.getAPIRoutes());
    } catch (error: any) {
      logger.error(error.message);
    }
    logger.info(`App started at http://localhost:${port}`);
  });
};

bootstrap();
