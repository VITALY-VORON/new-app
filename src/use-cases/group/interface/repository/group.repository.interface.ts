import { IGroupEntity } from "src/entiies/group/interface/group.entity.interface";
import { ICreateGroupDto } from "../dto/create.group.dto.interface";

export interface IGroupRepository {
    findOne(groupId: string): Promise<IGroupEntity>;
    getGroup(groupId: string): Promise<IGroupEntity>;
    createGroup(data: ICreateGroupDto): Promise<IGroupEntity>;
}