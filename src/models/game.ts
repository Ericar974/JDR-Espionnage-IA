import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';
import { v4 as uuidv4 } from 'uuid';
import { GameSchema } from '../api-schema/game.t';

const prefix: String = 'g';

interface GameInstance extends Model<GameSchema>, GameSchema {}

export default sequelize.define<GameInstance>('Game', {
  id: {
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
