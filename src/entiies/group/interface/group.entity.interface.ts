import { UserEntity } from "src/infrastructure/db/entities/user.entity";

export interface IGroupEntity {
  id: string;
  name: string;
  users: UserEntity[];
}
