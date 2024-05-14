import { ICreateTaskDto } from "src/use-cases/task/interface/dto/create.task.interface.dto";

export class CreateTaskDto implements ICreateTaskDto {
    id?: string;
    userId: string;
    title: string;
    description: string;
}