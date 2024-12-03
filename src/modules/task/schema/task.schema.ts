import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { TaskStatusEnum } from '../enums/task.enum';
import { ITask } from '../interface/task-schema.interface';


const taskSchema = new Schema<ITask>(
    {
        id: {
            type: String,
            default: uuidv4,
            unique: true
        },
        title: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: [TaskStatusEnum.pending,
            TaskStatusEnum.completed],
            default: TaskStatusEnum.pending
        },
    },
    {
        timestamps: true
    }
);

export const Task = mongoose.model<ITask>('Task', taskSchema);

