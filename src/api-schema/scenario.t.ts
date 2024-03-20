export interface ScenariosSchema {
  id: string;
  title: string;
  description: string;
  source: string;
  publishedDate: Date;
  missionId: string | null;
}
