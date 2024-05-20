import { Controller, Get, Inject, Param, Post, UseGuards } from '@nestjs/common';
import { IUserService } from 'src/use-cases/user/interface/service/user.service.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/infrastructure/JWT/guards/jwt.guard';

@Controller('user')
@ApiTags('User')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UserController {
  constructor(
    @Inject('userService')
    private readonly userService: IUserService,
  ) {}

  @Get('getUser/:id')
  async findById(@Param('id') id: string) {
    const user = await this.userService.findById(id);

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }

  @Get('findUser/:email')
  async findByEmail(@Param('email') email: string) {
    const user = await this.userService.findByEmail(email);

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }

  @Post(':userId/groups/:groupId')
  async addUserToGroup(
    @Param('userId') userId: string,
    @Param('groupId') groupId: string,
  ): Promise<void> {
    await this.userService.addUserToGroup(userId, groupId);
  }
}
