import { Sequelize } from 'sequelize';
import configs from './global.config';

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: configs.database.host,
  port: configs.database.port,
  username: configs.database.username,
  password: configs.database.password,
  database: configs.database.database,
  logging: console.log,
});

export default sequelize;
