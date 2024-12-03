import { TaskStatusEnum } from "../enums/task.enum";

export interface ITask extends Document {
    id: string;
    title: string;
    description: string;
    status: TaskStatusEnum;
}
