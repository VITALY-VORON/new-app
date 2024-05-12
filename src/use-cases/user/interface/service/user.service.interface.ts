import { IUserEntity } from "src/entiies/user/interface/user.entity.interface";
import { ICreateUserDto } from "../dto/create.user.dto.interface";

export interface IUserService {
    createUser(data: ICreateUserDto): Promise<{ token: string }>;
    signIn(data: IUserEntity): Promise<{ token: string }>;
    findByEmail(email: string): Promise<IUserEntity>;
    findById(id: string): Promise<IUserEntity>;
}