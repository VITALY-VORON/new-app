import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user.module';
import { PassportModule } from '@nestjs/passport';
import { AuthServidce } from 'src/use-cases/auth/service/auth.service';
import { AuthController } from 'src/presintation/controllers/auth.controller';
import { LocalStrategy } from '../JWT/strategies/local.strategy';
import { JwtStrategy } from '../JWT/strategies/jwt.strategy';
import { UserService } from 'src/use-cases/user/service/user.service';
import { UserRepository } from '../db/repositories/user.repository';
import { UserEntity } from '../db/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupRepository } from '../db/repositories/group.repository';
import { GroupEntity } from '../db/entities/group.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, GroupEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.getOrThrow<string>('JWT_SECRET_KEY'),
          signOptions: {
            expiresIn: configService.getOrThrow<string>('EXPIRES_IN'),
          },
        };
      },
    }),
    UserModule,
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [
    { provide: 'authService', useClass: AuthServidce },
    { provide: 'userService', useClass: UserService },
    { provide: 'userRepository', useClass: UserRepository },
    {
      provide: 'groupRepository',
      useClass: GroupRepository,
    },
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AuthModule {}
