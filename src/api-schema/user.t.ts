import { CharacterSchema } from './character.t';

export interface UserSchema {
  id: string;
  character: CharacterSchema;
}
