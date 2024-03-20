import { resolve } from 'node:path';
import { Sequelize } from 'sequelize';

/**
 * Init sequelize for project
 */
export default new Sequelize({
  dialect: 'sqlite',
  storage: resolve(__dirname, '../data/database.sqlite'),
});
