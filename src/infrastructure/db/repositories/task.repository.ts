import { ICreateTaskDto } from 'src/use-cases/task/interface/dto/create.task.interface.dto';
import { TaskEntity } from '../entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ITaskRepository } from 'src/use-cases/task/interface/repository/task.repository.interface';

export class TaskRepository implements ITaskRepository {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  async createTask(data: ICreateTaskDto): Promise<TaskEntity> {
    try {
      const task = this.taskRepository.create(data);
      return await this.taskRepository.save(task);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAllTasks(userId: string): Promise<TaskEntity[]> {
    try {
      return await this.taskRepository.find({ where: { userId: userId } });
    } catch (error) {}
  }

  async findTaskById(id: string): Promise<TaskEntity> {
    try {
      return await this.taskRepository.findOneBy({ id });
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteTask(id: string): Promise<void> {
    try {
      await this.taskRepository.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
