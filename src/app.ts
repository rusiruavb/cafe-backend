import 'dotenv/config';
import express from 'express';
import sequelize from './configs/database.config';
import configs from './configs/global.config';

const bootstrap = async () => {
  const app = express();
  const { port } = configs.app;

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.listen(port, async () => {
    try {
      await sequelize.authenticate();
      console.log('DB Connected');
    } catch (error: any) {
      console.log(error.message);
    }
    console.log(`App started at http://localhost:${port}`);
  });
};

bootstrap();
