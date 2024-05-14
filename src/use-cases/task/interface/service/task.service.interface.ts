import { TaskEntity } from "src/infrastructure/db/entities/task.entity";
import { ICreateTaskDto } from "../dto/create.task.interface.dto";

export interface ITaskService {
    createTask(data: ICreateTaskDto): Promise<TaskEntity>;
    findTaskById(id: string): Promise<TaskEntity>;
    deleteTask(id: string): Promise<void>;
}