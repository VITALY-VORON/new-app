import { Controller, Post, UseGuards, Request, Body, Inject } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/infrastructure/JWT/guards/local.guard';
import { AuthService } from 'src/use-cases/auth/service/auth.service';
import { CreateUserDto } from './dto/user/create.user.dto';
import { IUserEntity } from 'src/entiies/user/interface/user.entity.interface';
import { ICreateUserDto } from 'src/use-cases/user/interface/dto/create.user.dto.interface';
import { IAuthService } from 'src/use-cases/auth/interface/service/auth.service.interface';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('authService')
    private readonly authService: IAuthService
) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: CreateUserDto })
  async login(@Request() req) {
    return this.authService.login(req.user as IUserEntity);
  }

  @Post('/register')
  register(@Body() dto: ICreateUserDto) {
    return this.authService.register(dto);
  }
}
