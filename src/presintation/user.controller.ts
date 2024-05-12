import { Body, Controller, Get, Inject, Param, Post } from "@nestjs/common";
import { IUserService } from "src/use-cases/user/interface/service/user.service.interface";
import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { ICreateUserDto } from "src/use-cases/user/interface/dto/create.user.dto.interface";
import { IUserEntity } from "src/entiies/user/interface/user.entity.interface";

@Controller('user')
@ApiTags('User')
export class UserController {
    constructor(
        @Inject('userService')
        private readonly userService: IUserService
    ) { }

    @Post('signup')
    @ApiConsumes('application/json')
    @ApiBody({
        schema: {
            properties: {
                email: { type:'string', default: "test@test.com" },
                password: { type:'string', default: "12345678" },
                name: { type:'string', default: "John Doe" }
            }
        }
    })
    async createUser(@Body() data: ICreateUserDto) {
        await this.userService.createUser(data);
    }

    @Post('signin')
    @ApiBody({
        schema: {
            properties: {
                email: { type:'string', default: "test@test.com" },
                password: { type:'string', default: "12345678"}
            }
        }
    })
    async signIn(@Body() data: IUserEntity) {
        return this.userService.signIn(data)
    }

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