import { Router } from 'express';
import { createTaskControllerFunc, deleteTaskControllerFunc, getAllTasksControllerFunc, getTasksByStatusControllerFunc, updateTaskControllerFunc } from './task.controller';

export const taskRoutes = Router();

taskRoutes.post('/', createTaskControllerFunc);
taskRoutes.get('/', getAllTasksControllerFunc);
taskRoutes.put('/:id', updateTaskControllerFunc);
taskRoutes.delete('/:id', deleteTaskControllerFunc);
taskRoutes.get('/status/:status', getTasksByStatusControllerFunc);
