import { CharacterSchema } from './character';

/*
 * Defines UserSchema for representing user information with a unique identifier and associated character details, ensuring structured and consistent data management.
 */
export interface UserSchema {
  // Unique identifier for the user.
  id: string;
  // Character details associated with the user.
  character: CharacterSchema | null;
}
