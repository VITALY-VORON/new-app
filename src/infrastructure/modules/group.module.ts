import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupEntity } from '../db/entities/group.entity';
import { UserEntity } from '../db/entities/user.entity';
import { GroupController } from 'src/presintation/controllers/group.controller';
import { GroupRepository } from '../db/repositories/group.repository';
import { GroupService } from 'src/use-cases/group/service/group.service';
import { UserRepository } from '../db/repositories/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([GroupEntity, UserEntity]),
  ],
  providers: [
    {
        provide: 'groupRepository',
        useClass: GroupRepository,
    },
    {
        provide: 'groupService',
        useClass: GroupService,
    },
    {
        provide: 'userRepository',
        useClass: UserRepository,
    }
  ],
  controllers: [GroupController],
})
export class GroupModule {}
