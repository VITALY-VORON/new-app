import { Module } from "@nestjs/common";
import { UserController } from "src/presintation/user.controller";
import { UserService } from "src/use-cases/user/service/user.service";
import { UserRepository } from "../db/repositories/user.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../db/entities/user.entity";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "../JWT/strategies/local.strategy";
import { JwtStrategy } from "../JWT/strategies/jwt.strategy";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.getOrThrow('JWT_SECRET_KEY'),
          signOptions: { expiresIn: configService.getOrThrow('EXPIRES_IN') },
        };
      },
    }),
    PassportModule
  ],
  controllers: [UserController],
  providers: [
    LocalStrategy, JwtStrategy,
    {
      provide: 'userRepository',
      useClass: UserRepository,
    },
    {
      provide: 'userService',
      useClass: UserService,
    },
  ],
})
export class UserModule { }