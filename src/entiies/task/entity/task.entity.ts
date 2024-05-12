import { ITaskEntity } from "../interface/task.entity.interface";
import { TTaskEntity } from "../type/task.entity.type";

export class TaskEntity implements ITaskEntity {
    id?: string;
    userId: string;
    title: string;
    description: string;
    constructor(data: TTaskEntity) {
        this.id = data.id;
        this.userId = data.userId;
        this.title = data.title;
        this.description = data.description;
    }
}