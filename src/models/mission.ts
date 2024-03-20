import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';
import { v4 as uuidv4 } from 'uuid';
import { MissionSchema } from '../api-schema/mission';

const prefix: String = 'mis';

interface MissionInstance extends Model<MissionSchema>, MissionSchema {}

export default sequelize.define<MissionInstance>('Mission', {
  id: {
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
