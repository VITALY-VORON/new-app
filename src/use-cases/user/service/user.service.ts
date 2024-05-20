import { Inject, Injectable } from '@nestjs/common';
import { IUserService } from '../interface/service/user.service.interface';

import { IUserRepository } from '../interface/repository/user.repository.interface';
import { IUserEntity } from 'src/entiies/user/interface/user.entity.interface';
import { ICreateUserDto } from '../interface/dto/create.user.dto.interface';
import * as bcrypt from 'bcrypt';
import { IGroupRepository } from 'src/use-cases/group/interface/repository/group.repository.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject('userRepository')
    private readonly userRepository: IUserRepository,
    @Inject('groupRepository')
    private readonly groupRepository: IGroupRepository,
  ) {}

  async createUser(data: ICreateUserDto): Promise<IUserEntity> {
    const hash = bcrypt.hashSync(data.password, 10);

    return this.userRepository.createUser({
      email: data.email,
      password: hash,
      name: data.name,
    });
  }

  async findById(id: string): Promise<IUserEntity> {
    return this.userRepository.findById(id);
  }

  async findByEmail(email: string): Promise<IUserEntity> {
    return await this.userRepository.findByEmail(email);
  }

  async addUserToGroup(userId: string, groupId: string): Promise<void> {
    const user = await this.userRepository.findOne(userId);
    const group = await this.groupRepository.findOne(groupId);

    if (!user || !group) {
      throw new Error('User or Group not found');
    }

    user.groups.push(group);
    await this.userRepository.addUserToGroup(user);
  }
}
