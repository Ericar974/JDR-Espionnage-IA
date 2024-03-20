import { MissionSchema } from './mission';
import { UserSchema } from './user';

/*
 * Interface for game data, encapsulating essential details for game management and interactions within the platform.
 */
export interface GameSchema {
  // Unique identifier for the game; nullable for games not yet persisted.
  id: string | null;

  // The game's title; optional and may be unspecified.
  title: string | null;

  // Status of the game, indicating whether it's waiting, in progress, or completed; nullable for default state.
  status: 'Waiting' | 'Playing' | 'Completed' | null;

  // Array of user participants in the game, structured according to the UserSchema.
  users: UserSchema[];

  // Array of Multiple narrative scenario of the game; structured according to the MissionSchema.
  missions: MissionSchema[];

  // The game master (GM) UUID guiding the game.
  gmId: string | null;
}
