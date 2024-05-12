import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from "src/use-cases/user/service/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super({
            jwtFromRequrst: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: process.env.JWT_SECRET_KEY,
        })
    }

    async validate(payload: { id: string }) {
        const user = await this.userService.findById(payload.id);

        if (!user) {
            throw new UnauthorizedException('У вас нет доступа')
        }

        return {
            id: user.id
        }
    }
}