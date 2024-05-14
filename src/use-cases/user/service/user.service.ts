import { Inject, Injectable } from "@nestjs/common";
import { IUserService } from "../interface/service/user.service.interface";

import { IUserRepository } from "../interface/repository/user.repository.interface";
import { IUserEntity } from "src/entiies/user/interface/user.entity.interface";
import { ICreateUserDto } from "../interface/dto/create.user.dto.interface";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService implements IUserService {
    constructor(
        @Inject("userRepository")
        private readonly userRepository: IUserRepository,
    ) { }

    async createUser(data: ICreateUserDto): Promise<IUserEntity> {

        const hash = bcrypt.hashSync(data.password, 10);

        return this.userRepository.createUser({
            email: data.email,
            password:  hash,
            name: data.name,
        });
    }

    async findById(id: string): Promise<IUserEntity> {
        return this.userRepository.findById(id);
    }

    findByEmail(email: string): Promise<IUserEntity> {
        return this.userRepository.findByEmail(email);
    }
}