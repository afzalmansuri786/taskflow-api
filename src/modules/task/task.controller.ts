import { Request, Response } from 'express';
import { createTask, deleteTask, getAllTasks, getTasksByStatus, updateTaskStatus } from './task.service1';
// import { createTask, deleteTask, getAllTasks, getTasksByStatus, updateTaskStatus } from './task.service';
import { TaskResponse } from './interface/task-responses.interface';

export const createTaskController = async (req: Request, res: Response) => {
    try {
        const { title, description } = req.body;
        const newTask = await createTask({ title, description });
        const response: TaskResponse = {
            message: 'Task created successfully',
            task: {
                id: newTask.id,
                title: newTask.title,
                description: newTask.description,
                status: newTask.status,
            },
        };
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ error: 'Unable to create task' });
    }
};

export const getAllTasksController = async (req: Request, res: Response) => {
    try {
        const { title, description, status } = req.query;

        const filter: any = {};

        if (title) {
            filter.title = { $regex: new RegExp(title as string, 'i') };
        }

        if (description) {
            filter.description = { $regex: new RegExp(description as string, 'i') };
        }

        if (status) {
            filter.status = status;
        }

        const tasks = await getAllTasks(filter);

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch tasks' });
    }
};

export const updateTaskController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedTask = await updateTaskStatus(id, status);
        const response: TaskResponse = {
            message: 'Task updated successfully',
            task: {
                id: updatedTask._id,
                title: updatedTask.title,
                description: updatedTask.description,
                status: updatedTask.status,
            },
        };
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ error: 'Task not found' });
    }
};

export const deleteTaskController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await deleteTask(id);
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(404).json({ error: 'Task not found' });
    }
};

export const getTasksByStatusController = async (req: Request, res: Response) => {
    try {
        const { status } = req.params;
        const tasks = await getTasksByStatus(status);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch tasks' });
    }
};


