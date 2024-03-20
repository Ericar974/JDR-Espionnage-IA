import { UserSchema } from './user.t';

export interface GameSchema {
  id: string | null;
  title: string | null;
  status: 'Waiting' | 'Playing' | 'Completed' | null;
  users: UserSchema[];
  scenario: string | null;
}
