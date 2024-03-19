const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const { v4: uuidv4 } = require('uuid');

const User = sequelize.define('Missions', {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(),
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  place: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
});

module.exports = User;
