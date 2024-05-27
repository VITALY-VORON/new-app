import { Inject, Injectable } from '@nestjs/common';
import { ITaskService } from '../interface/service/task.service.interface';
import { TaskEntity } from 'src/infrastructure/db/entities/task.entity';
import { ICreateTaskDto } from '../interface/dto/create.task.interface.dto';
import { ITaskRepository } from '../interface/repository/task.repository.interface';
import { IUserRepository } from 'src/use-cases/user/interface/repository/user.repository.interface';
import { IGroupRepository } from 'src/use-cases/group/interface/repository/group.repository.interface';

@Injectable()
export class TaskService implements ITaskService {
  constructor(
    @Inject('taskRepository')
    private readonly taskRepository: ITaskRepository,
    @Inject('userRepository')
    private readonly userRepository: IUserRepository,
    @Inject('groupRepository')
    private readonly groupRepository: IGroupRepository
  ) {}

  createTask(data: ICreateTaskDto, userId: string): Promise<TaskEntity> {
    try {
      const task = {
        id: data.id,
        userId: { id: userId },
        title: data.title,
        description: data.description,
        stage: data.stage,
        createdAt: data.createdAt,
        endDate: data.endDate,
      };
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

  async createTaskForGroup(userId: string, groupId: string, title: string, description: string, stage: string, createdAt: string | null, endDate: string | null): Promise<TaskEntity> {
    const user = await this.userRepository.findById(userId);
    const group = await this.groupRepository.getGroup(groupId);

    
    if (!user || !group) {
      throw new Error('User or Group not found');
    }
    
    if (!group.users.some((groupUser) => groupUser.id === userId)) {
      throw new Error('User is not a member of the group');
    }

    delete user["password"]
    group.users.map((user) => delete user["password"])

    const task = {
      title: title,
      description: description,
      stage: stage,
      user: user,
      group: group,
      createdAt: createdAt,
      endDate: endDate,
    }

    return this.taskRepository.createTask(task);
  }
}
