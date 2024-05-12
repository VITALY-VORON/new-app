import { Inject, Injectable } from "@nestjs/common";
import { IUserService } from "../interface/service/user.service.interface";

import { IUserRepository } from "../interface/repository/user.repository.interface";
import { IUserEntity } from "src/entiies/user/interface/user.entity.interface";
import { ICreateUserDto } from "../interface/dto/create.user.dto.interface";

@Injectable()
export class UserService implements IUserService {
    constructor(
        @Inject("userRepository")
        private readonly userRepository: IUserRepository,
    ) { }

    async createUser(data: ICreateUserDto): Promise<IUserEntity> {
        return this.userRepository.createUser(data);
    }

    async findById(id: string): Promise<IUserEntity> {
        return this.userRepository.findById(id);
    }

    findByEmail(email: string): Promise<IUserEntity> {
        return this.userRepository.findByEmail(email);
    }
}