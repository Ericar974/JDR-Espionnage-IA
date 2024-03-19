import { resolve } from 'node:path';
import { Sequelize } from 'sequelize';

export default new Sequelize({
  dialect: 'sqlite',
  storage: resolve(__dirname, '../data/database.sqlite'),
});
