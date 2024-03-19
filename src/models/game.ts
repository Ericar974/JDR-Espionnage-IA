import { DataTypes } from 'sequelize';
import sequelize from '../sequelize';
import { v4 as uuidv4 } from 'uuid';

const prefix: String = 'g';

export default sequelize.define('Game', {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: () => `${prefix}-${uuidv4()}`,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('Waiting', 'Playing', 'Completed'),
    defaultValue: 'Waiting',
    allowNull: false,
  },
  usersId: {
    type: DataTypes.JSONB,
    defaultValue: () => [],
    allowNull: false,
  },
  scenario: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
