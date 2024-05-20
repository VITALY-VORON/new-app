import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from '../db/entities/task.entity';
import { TaskRepository } from '../db/repositories/task.repository';
import { TaskController } from 'src/presintation/controllers/task.controller';
import { TaskService } from 'src/use-cases/task/service/task.service';
import { UserRepository } from '../db/repositories/user.repository';
import { GroupRepository } from '../db/repositories/group.repository';
import { UserEntity } from '../db/entities/user.entity';
import { GroupEntity } from '../db/entities/group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity, UserEntity, GroupEntity])],
  controllers: [TaskController],
  providers: [
    {
      provide: 'taskRepository',
      useClass: TaskRepository,
    },
    {
      provide: 'taskService',
      useClass: TaskService,
    },
    {
      provide: 'userRepository',
      useClass: UserRepository,
    },
    {
      provide: 'groupRepository',
      useClass: GroupRepository,
    },
  ],
})
export class TaskModule {}
