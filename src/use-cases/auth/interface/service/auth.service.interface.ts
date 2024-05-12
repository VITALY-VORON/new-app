import { IUserEntity } from "src/entiies/user/interface/user.entity.interface";
import { ICreateUserDto } from "src/use-cases/user/interface/dto/create.user.dto.interface";

export interface IAuthService {
    validateUser(email: string, password: string): Promise<{
        id?: string;
        email: string;
        name: string;
    } | null>
    register(data: ICreateUserDto): Promise<{
        token: string;
    }>
    login(data: IUserEntity): Promise<{
        token: string;
    }>
}