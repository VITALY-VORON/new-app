import { TaskEntity } from 'src/infrastructure/db/entities/task.entity';
import { ICreateTaskDto } from '../dto/create.task.interface.dto';

export interface ITaskRepository {
  createTask(data: ICreateTaskDto): Promise<TaskEntity>;
  getAllTasks(userId: string): Promise<TaskEntity[]>;
  findTaskById(id: string): Promise<TaskEntity>;
  deleteTask(id: string): Promise<void>;
}
