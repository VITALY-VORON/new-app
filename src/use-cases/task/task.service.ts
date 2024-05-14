import { Inject, Injectable } from "@nestjs/common";
import { ITaskService } from "./interface/service/task.service.interface";
import { TaskEntity } from "src/infrastructure/db/entities/task.entity";
import { ICreateTaskDto } from "./interface/dto/create.task.interface.dto";
import { ITaskRepository } from "./interface/repository/task.repository.interface";

@Injectable()
export class TaskService implements ITaskService {

    constructor(
        @Inject('taskRepository')
        private readonly taskRepository: ITaskRepository,
    ) { }

    createTask(data: ICreateTaskDto): Promise<TaskEntity> {
        try {
            return this.taskRepository.createTask(data);
        } catch (error) {
            throw new Error(error);
        }
    }
    findTaskById(id: string): Promise<TaskEntity> {
        try {
            return this.taskRepository.findTaskById(id);
        } catch (error) {
            throw new Error(error);
        }
    }
    async deleteTask(id: string): Promise<void> {
        try {
            return await this.taskRepository.deleteTask(id);
        } catch (error) {
            throw new Error(error);
        }
    }
    
}