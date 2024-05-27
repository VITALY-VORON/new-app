import { ITaskEntity } from '../interface/task.entity.interface';
import { TTaskEntity } from '../type/task.entity.type';

export class TaskEntity implements ITaskEntity {
  id?: string;
  title: string;
  description: string;
  stage: string;
  createdAt: Date;
  endDate: Date;
  userId: string;
  constructor(data: TTaskEntity) {
    this.id = data.id;
    this.userId = data.userId;
    this.title = data.title;
    this.description = data.description;
    this.stage = data.stage;
    this.createdAt = data.createdAt;
    this.endDate = data.endDate;
  }
}
