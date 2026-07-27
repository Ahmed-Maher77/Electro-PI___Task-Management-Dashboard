import { Router } from 'express';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/task.controller.js';
import {
  createTaskValidator,
  updateTaskValidator,
  taskIdParamValidator,
} from '../validators/task.validator.js';
import { validateMiddleware } from '../middleware/validate.middleware.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

export const projectTaskRouter = Router({ mergeParams: true });
export const taskRouter = Router();

projectTaskRouter.use(authMiddleware);
taskRouter.use(authMiddleware);

projectTaskRouter.get('/', getTasks);
projectTaskRouter.post('/', createTaskValidator, validateMiddleware, createTask);

taskRouter.patch('/:id', updateTaskValidator, validateMiddleware, updateTask);
taskRouter.delete('/:id', taskIdParamValidator, validateMiddleware, deleteTask);

export default taskRouter;
