import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { IGroupEntity } from 'src/entiies/group/interface/group.entity.interface';
import { JwtAuthGuard } from 'src/infrastructure/JWT/guards/jwt.guard';
import { ICreateGroupDto } from 'src/use-cases/group/interface/dto/create.group.dto.interface';
import { IGroupService } from 'src/use-cases/group/interface/service/group.service.interface';

@Controller('groups')
@ApiTags('Group')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class GroupController {
  constructor(
    @Inject('groupService')
    private readonly groupService: IGroupService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new group' })
  @ApiResponse({
    status: 201,
    description: 'The group has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiBody({
    schema: {
      properties: {
        name: { type: 'string', default: 'Group name' },
      },
    },
  })
  async createGroup(
    @Body() createGroupDto: ICreateGroupDto,
  ): Promise<IGroupEntity> {
    return await this.groupService.createGroup(createGroupDto);
  }

  @Get(':groupId')
  @ApiOperation({ summary: 'Get a group with its users' })
  @ApiResponse({ status: 200, description: 'Return the group with its users' })
  @ApiResponse({ status: 404, description: 'Group not found' })
  @ApiParam({
    name: 'groupId',
    description: 'ID of the group to retrieve',
    type: String,
  })
  async getGroup(
    @Param('groupId') groupId: string,
  ): Promise<IGroupEntity> {
    return await this.groupService.getGroup(groupId);
  }
}
