import { IGroupEntity } from "src/entiies/group/interface/group.entity.interface";
import { ICreateGroupDto } from "../dto/create.group.dto.interface";

export interface IGroupService {
    getGroup(groupId: string): Promise<IGroupEntity>;
    createGroup(data: ICreateGroupDto): Promise<IGroupEntity>;
}