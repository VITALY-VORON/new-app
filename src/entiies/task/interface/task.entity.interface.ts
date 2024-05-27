export interface ITaskEntity {
  id?: string;
  userId: string;
  title: string;
  description: string;
  stage: string;
  createdAt: Date;
  endDate: Date;
}
