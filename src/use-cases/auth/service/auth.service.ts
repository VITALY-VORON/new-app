import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ICreateUserDto } from '../../user/interface/dto/create.user.dto.interface';
import { IUserEntity } from 'src/entiies/user/interface/user.entity.interface';
import { IUserService } from 'src/use-cases/user/interface/service/user.service.interface';
import { IAuthService } from '../interface/service/auth.service.interface';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject('userService')
    private userService: IUserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async register(data: ICreateUserDto) {
    try {
      const userData = await this.userService.createUser(data);

      return {
        token: this.jwtService.sign({ id: userData.id }),
      };
    } catch (err) {
      console.log(err);
      throw new ForbiddenException('Ошибка при регистрации');
    }
  }

  async login(data: IUserEntity) {
    return {
      token: this.jwtService.sign({ id: data.id }),
    };
  }
}
