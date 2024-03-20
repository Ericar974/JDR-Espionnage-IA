/*
 * This module defines the Mission model with Sequelize ORM. It outlines the structure
 * for storing mission data, including unique identifiers, mission location, and timing.
 * The model utilizes custom default values and integrates a mission-specific schema
 * for validation and data integrity.
 */

import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';
import { v4 as uuidv4 } from 'uuid';
import { MissionSchema } from '../api-schema/mission';

// Setting a prefix for mission IDs to uniquely identify them in the database.
const prefix: String = 'mis';

// Interface for the Mission instance, enhancing type safety and IDE support by extending
// both Sequelize's Model and the custom MissionSchema.
interface MissionInstance extends Model<MissionSchema>, MissionSchema {}

// Defining and exporting the Mission model to be utilized within the application.
export default sequelize.define<MissionInstance>('Mission', {
  // Unique identifier for each mission, constructed from a custom prefix and a UUID.
  id: {
    type: DataTypes.UUID,
    defaultValue: () => `${prefix}-${uuidv4()}`,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  // The country where the mission is located. This field is required.
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Specific place of the mission within the country. This field is also required.
  place: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Date and time when the mission is scheduled to occur, with the current date and time as default.
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
});
