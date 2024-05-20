import { ICreateTaskDto } from 'src/use-cases/task/interface/dto/create.task.interface.dto';

export class CreateTaskDto implements ICreateTaskDto {
  stage: 'start' | 'dev' | 'check' | 'complite';
  id?: string;
  userId: string;
  title: string;
  description: string;
}
