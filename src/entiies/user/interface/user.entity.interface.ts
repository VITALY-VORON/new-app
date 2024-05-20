import { IGroupEntity } from "src/entiies/group/interface/group.entity.interface";

export interface IUserEntity {
  id?: string;
  email: string;
  password: string;
  name: string;
  groups: IGroupEntity[];
}
