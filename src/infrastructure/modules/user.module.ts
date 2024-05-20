import { Module } from '@nestjs/common';
import { UserController } from 'src/presintation/controllers/user.controller';
import { UserService } from 'src/use-cases/user/service/user.service';
import { UserRepository } from '../db/repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../db/entities/user.entity';
import { GroupRepository } from '../db/repositories/group.repository';
import { GroupEntity } from '../db/entities/group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, GroupEntity])],
  controllers: [UserController],
  providers: [
    {
      provide: 'userRepository',
      useClass: UserRepository,
    },
    {
      provide: 'userService',
      useClass: UserService,
    },
    {
      provide: 'groupRepository',
      useClass: GroupRepository,
    }
  ],
})
export class UserModule {}
