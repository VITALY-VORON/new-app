import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiConsumes, ApiBody, ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UserId } from 'src/infrastructure/decorators/user-id.decorator';
import { JwtAuthGuard } from 'src/infrastructure/JWT/guards/jwt.guard';
import { ICreateTaskDto } from 'src/use-cases/task/interface/dto/create.task.interface.dto';
import { ITaskService } from 'src/use-cases/task/interface/service/task.service.interface';

@Controller('task')
@ApiTags('Task')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TaskController {
  constructor(
    @Inject('taskService')
    private readonly taskService: ITaskService,
  ) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new task' })
  @ApiConsumes('application/json')
  @ApiBody({
    schema: {
      properties: {
        title: { type: 'string', default: 'fdbskjfbdf' },
        description: { type: 'string', default: 'fdjhsfbhjfb' },
        stage: { type:'string', default: 'start' },
        createdAt: { type: 'date', default: "" },
        endDate: { type: 'date', default: "" },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'The task has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createTask(@Body() data: ICreateTaskDto, @UserId() id: string) {
    return await this.taskService.createTask(data, id);
  }

  @Post('createForGroup')
  @ApiOperation({ summary: 'Create a new task for a group' })
  @ApiConsumes('application/json')
  @ApiBody({
    schema: {
      properties: {
        userId: { type: 'string' },
        groupId: { type: 'string' },
        title: { type: 'string' },
        description: { type: 'string' },
        stage: { type: 'string' },
        createdAt: { type: 'date', default: "" },
        endDate: { type: 'date', default: "" },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'The task has been successfully created for the group.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createTaskForGroup(@Body() createTaskDto: { userId: string; groupId: string; title: string; description: string; stage: string, createdAt: string | null, endDate: string | null }) {
    const { userId, groupId, title, description, stage, createdAt, endDate } = createTaskDto;
    return this.taskService.createTaskForGroup(userId, groupId, title, description, stage, createdAt, endDate);
  }

  @Get('get')
  @ApiOperation({ summary: 'Get all tasks for the current user' })
  @ApiResponse({ status: 200, description: 'Return all tasks for the user.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async getAllTasks(@UserId() id: string) {
    return await this.taskService.getAllTasks(id);
  }

  @Get('get/:id')
  @ApiOperation({ summary: 'Get a task by its ID' })
  @ApiParam({ name: 'id', description: 'Task ID', type: 'string' })
  @ApiResponse({ status: 200, description: 'Return the task with the given ID.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  async findTaskById(@Param('id') id: string) {
    return await this.taskService.findTaskById(id);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a task by its ID' })
  @ApiParam({ name: 'id', description: 'Task ID', type: 'string' })
  @ApiResponse({ status: 200, description: 'The task has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  async deleteTask(@Param('id') id: string) {
    await this.taskService.deleteTask(id);
  }
}
