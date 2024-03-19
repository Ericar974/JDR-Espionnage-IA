const { resolve } = require('node:path');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: resolve(__dirname, '../data/database.sqlite'),
});

module.exports = sequelize;
