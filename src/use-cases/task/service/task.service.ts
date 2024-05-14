import { Inject, Injectable } from "@nestjs/common";
import { ITaskService } from "../interface/service/task.service.interface";
import { TaskEntity } from "src/infrastructure/db/entities/task.entity";
import { ICreateTaskDto } from "../interface/dto/create.task.interface.dto";
import { ITaskRepository } from "../interface/repository/task.repository.interface";
import { UserId } from "src/infrastructure/decorators/user-id.decorator";

@Injectable()
export class TaskService implements ITaskService {

    constructor(
        @Inject('taskRepository')
        private readonly taskRepository: ITaskRepository,
    ) { }

    createTask(data: ICreateTaskDto, userId: string): Promise<TaskEntity> {
        try {
            const task = {
                id: data.id,
                userId: { id: userId },
                title: data.title,
                description: data.description,
            }
            return this.taskRepository.createTask(task);
        } catch (error) {
            throw new Error(error);
        }
    }

    getAllTasks(userId: string): Promise<TaskEntity[]> {
        try {
            return this.taskRepository.getAllTasks(userId);
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