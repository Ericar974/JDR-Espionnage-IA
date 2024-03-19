import { DataTypes } from 'sequelize';
import sequelize from '../sequelize';
import { v4 as uuidv4 } from 'uuid';

const prefix: String = 'mis';

export default sequelize.define('Mission', {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: () => `${prefix}-${uuidv4()}`,
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
