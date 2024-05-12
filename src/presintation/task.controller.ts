import { Body, Controller, Delete, Get, Inject, Param, Post } from "@nestjs/common";
import { ApiConsumes, ApiBody } from "@nestjs/swagger";
import { ICreateTaskDto } from "src/use-cases/task/dto/create.task.interface.dto";
import { ITaskService } from "src/use-cases/task/service/task.servicce.interface";

@Controller('task')
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
                userId: { type:'string', default: "fkdjsfbzdhsfbdskfbhjdszbfdzb" },
                title: { type:'string', default: "fdbskjfbdf" },
                description: { type:'string', default: "fdjhsfbhjfb" }
            }
        }
    })
    async createTask(@Body() data: ICreateTaskDto) {
        await this.taskService.createTask(data);
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