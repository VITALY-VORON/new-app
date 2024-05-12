import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TaskEntity } from "../db/entities/task.entity";
import { TaskRepository } from "../db/repositories/task.repository";
import { TaskController } from "src/presintation/task.controller";
import { TaskService } from "src/use-cases/task/task.service";

@Module({
    imports: [TypeOrmModule.forFeature([TaskEntity])],
    controllers: [TaskController],
    providers: [
        {
            provide: 'taskRepository',
            useClass: TaskRepository,
        },
        {
            provide: 'taskService',
            useClass: TaskService,
        }
    ],
})
export class TaskModule { }