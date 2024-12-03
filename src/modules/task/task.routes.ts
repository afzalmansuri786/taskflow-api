import { Router } from 'express';
import { createTaskController, deleteTaskController, getAllTasksController, getTasksByStatusController, updateTaskController } from './task.controller';

const router = Router();

router.post('/', createTaskController);
router.get('/', getAllTasksController);
router.put('/:id', updateTaskController);
router.delete('/:id', deleteTaskController);
router.get('/status/:status', getTasksByStatusController);

export default router;
