import { Inject, Injectable } from '@nestjs/common';
import { IGroupRepository } from '../interface/repository/group.repository.interface';
import { IGroupEntity } from 'src/entiies/group/interface/group.entity.interface';
import { IGroupService } from '../interface/service/group.service.interface';
import { ICreateGroupDto } from '../interface/dto/create.group.dto.interface';

@Injectable()
export class GroupService implements IGroupService {
  constructor(
    @Inject('groupRepository')
    private readonly groupRepository: IGroupRepository
  ) {}

  async getGroup(groupId: string): Promise<IGroupEntity> {
    const group = await this.groupRepository.getGroup(groupId);

    if (!group) {
      throw new Error('Group not found');
    }

    return group;
  }
  
  async createGroup(data: ICreateGroupDto): Promise<IGroupEntity> {
      try {
        return await this.groupRepository.createGroup(data);
      } catch (error) {
        throw new Error('Group not found');
      }
  }
}
