import { ForbiddenException, Inject, Injectable } from "@nestjs/common";
import { ICreateUserDto } from "../interface/dto/create.user.dto.interface";
import { IUserService } from "../interface/service/user.service.interface";

import * as bcript from "bcrypt";
import { IUserRepository } from "../interface/repository/user.repository.interface";
import { IUserEntity } from "src/entiies/user/interface/user.entity.interface";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService implements IUserService {
    constructor(
        @Inject("userRepository")
        private readonly userRepository: IUserRepository,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.findByEmail(email);

        if (user && user.password === password) {
            const { password, ...result } = user;
            return result;
        }

        return null;
    }

    async createUser(data: ICreateUserDto): Promise<{ token: string }> {
        try {
            const solt = 10
            const hash = await bcript.hash(data.password, solt);
            const user = await this.userRepository.createUser({
                email: data.email,
                password:  hash,
                name: data.name,
            });
            return {
                token: this.jwtService.sign({ id: user.id })
            }
        } catch (error) {
            throw new ForbiddenException('Ошибка при регистрации');
        }

    }

    async signIn(user: IUserEntity): Promise<{ token: string }> {
        return {
            token: this.jwtService.sign({ id: user.id }),
          };
    }

    async findById(id: string): Promise<IUserEntity> {
        return this.userRepository.findById(id);
    }

    findByEmail(email: string): Promise<IUserEntity> {
        return this.userRepository.findByEmail(email);
    }
}