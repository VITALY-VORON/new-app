import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GroupEntity } from "../entities/group.entity";
import { Repository } from "typeorm";
import { IGroupEntity } from "src/entiies/group/interface/group.entity.interface";
import { ICreateGroupDto } from "src/use-cases/group/interface/dto/create.group.dto.interface";
import { IGroupRepository } from "src/use-cases/group/interface/repository/group.repository.interface";

@Injectable()
export class GroupRepository implements IGroupRepository {
    constructor(
        @InjectRepository(GroupEntity)
        private readonly groupRepository: Repository<GroupEntity>
    ) { }

    async createGroup(data: ICreateGroupDto): Promise<IGroupEntity> {
        try {
            const group = this.groupRepository.create(data);
            return await this.groupRepository.save(group);
        } catch (error) {
            throw new Error('Group not found');
        }
    }

    async findOne(groupId: string): Promise<IGroupEntity> {
        try {
            return await this.groupRepository.findOne({ where: { id: groupId }, relations: ["users"] });
        } catch (error) {
            throw new Error('Group not found');
        }
    }

    async getGroup(groupId: string) {
        try {
            return await this.groupRepository.findOne({ where: { id: groupId }, relations: ["users", "tasks"] });
        } catch (error) {
            throw new Error('Group not found');
        }
    }
}