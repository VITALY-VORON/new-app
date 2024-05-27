import { ICreateTaskDto } from 'src/use-cases/task/interface/dto/create.task.interface.dto';

export class CreateTaskDto implements ICreateTaskDto {
  stage: string;
  id?: string;
  userId: string;
  title: string;
  description: string;
  groupId?: string;
  createdAt: string | null;
  endDate: string | null;
}
