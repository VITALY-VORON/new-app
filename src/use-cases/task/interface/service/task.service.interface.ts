import { TaskEntity } from 'src/infrastructure/db/entities/task.entity';
import { ICreateTaskDto } from '../dto/create.task.interface.dto';

export interface ITaskService {
  createTask(data: ICreateTaskDto, userId: string): Promise<TaskEntity>;
  getAllTasks(userId: string): Promise<TaskEntity[]>;
  findTaskById(id: string): Promise<TaskEntity>;
  deleteTask(id: string): Promise<void>;
  createTaskForGroup(userId: string, groupId: string, title: string, description: string, stage: string, createdAt: string | null, endDate: string | null)
}
