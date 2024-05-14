import { Body, Controller, Delete, Get, Inject, Param, Post, Req, UseGuards } from "@nestjs/common";
import { ApiConsumes, ApiBody, ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { UserId } from "src/infrastructure/decorators/user-id.decorator";
import { JwtAuthGuard } from "src/infrastructure/JWT/guards/jwt.guard";
import { ICreateTaskDto } from "src/use-cases/task/interface/dto/create.task.interface.dto";
import { ITaskService } from "src/use-cases/task/interface/service/task.service.interface";

@Controller('task')
@ApiTags('Task')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TaskController {
    constructor(
        @Inject('taskService')
        private readonly taskService: ITaskService,
    ) { }

    @Post('create')
    @ApiConsumes('application/json')
    @ApiBody({
        schema: {
            properties: {
                title: { type:'string', default: "fdbskjfbdf" },
                description: { type:'string', default: "fdjhsfbhjfb" }
            }
        }
    })
    async createTask(@Body() data: ICreateTaskDto, @UserId() id: string) {
        return await this.taskService.createTask(data, id);
    }

    @Get('get')
    async getAllTasks(@UserId() id: string) {
        return await this.taskService.getAllTasks(id);
    }

    @Get('get/:id')
    async findTaskById(@Param('id') id: string) {
        return await this.taskService.findTaskById(id);
    }

    @Delete('delete/:id')
    async deleteTask(@Param('id') id: string) {
        await this.taskService.deleteTask(id);
    }
}