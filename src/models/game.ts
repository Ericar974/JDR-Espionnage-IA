/*
 * This module defines the Game model with Sequelize ORM. It integrates unique identifiers,
 * custom default values, and schema validation for a gaming application database schema.
 * The Game model includes details such as game ID, title, status, list of users, game scenario,
 * and the game master (GM) information.
 */

import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';
import { v4 as uuidv4 } from 'uuid';
import { GameSchema } from '../api-schema/game';

// Prefix for game IDs to easily identify them in the database.
const prefix: String = 'g';

// Interface for the Game instance, extending both Sequelize Model and the Game schema for type safety.
interface GameInstance extends Model<GameSchema>, GameSchema {}

// Defining and exporting the Game model to be used within the application.
export default sequelize.define<GameInstance>('Game', {
  // Unique identifier for each game, using UUID with a custom prefix.
  id: {
    type: DataTypes.UUID,
    defaultValue: () => `${prefix}-${uuidv4()}`,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  // Optional title of the game.
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  // Current status of the game, restricted to specific enumerated values.
  status: {
    type: DataTypes.ENUM('Waiting', 'Playing', 'Completed'),
    defaultValue: 'Waiting',
    allowNull: false,
  },
  // List of users participating in the game, stored in a JSONB format for flexibility.
  users: {
    type: DataTypes.JSONB,
    defaultValue: () => [],
    allowNull: false,
  },
  // List of missions in the game, stored in a JSONB format for flexibility.
  missions: {
    type: DataTypes.JSONB,
    defaultValue: () => [],
    allowNull: false,
  },
  // UUID of the game master (GM).
  gmId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
