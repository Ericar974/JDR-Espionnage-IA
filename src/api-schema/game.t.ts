export interface GameSchema {
  id: string | null;
  title: string | null;
  status: 'Waiting' | 'Playing' | 'Completed' | null;
  usersId: {
    id: string;
    agentId: string;
  };
  scenario: string | null;
}
