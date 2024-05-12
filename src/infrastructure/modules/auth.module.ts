import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user.module';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from 'src/use-cases/auth/service/auth.service';
import { LocalStrategy } from '../JWT/strategies/local.strategy';
import { JwtStrategy } from '../JWT/strategies/jwt.strategy';
import { AuthController } from 'src/presintation/auth.controller';
import { UserRepository } from '../db/repositories/user.repository';

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                return {
                    secret: configService.get('JWT_SECRET_KEY'),
                    signOptions: { expiresIn: configService.get('EXPIRES_IN') },
                };
            },
        }),
        UserModule,
        PassportModule,
    ],
    providers: [
        LocalStrategy,
        JwtStrategy,
        {
            provide: 'authService',
            useClass: AuthService,
        },
        {
            provide: 'userRepository',
            useClass: UserRepository,
        },
    ],
    controllers: [AuthController],
})
export class AuthModule { }
