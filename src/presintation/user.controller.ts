import { Controller, Get, Inject, Param, Post } from "@nestjs/common";
import { IUserService } from "src/use-cases/user/interface/service/user.service.interface";
import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";

@Controller('user')
@ApiTags('User')
export class UserController {
    constructor(
        @Inject('userService')
        private readonly userService: IUserService
    ) { }

    @Get('getUser/:id')
    async findById(@Param('id') id: string) {
        const user = await this.userService.findById(id);

        return {
            id: user.id,
            email: user.email,
            name: user.name,
        }
    }

    @Get('findUser/:email')
    async findByEmail(@Param('email') email: string) {
        const user = await this.userService.findByEmail(email);

        return {
            id: user.id,
            email: user.email,
            name: user.name,
        }
    }
}