import { Router } from 'express';
import {
  getProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
} from '../controllers/project.controller.js';
import {
  createProjectValidator,
  updateProjectValidator,
  projectIdParamValidator,
} from '../validators/project.validator.js';
import { validateMiddleware } from '../middleware/validate.middleware.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { projectTaskRouter } from './task.routes.js';

const router = Router();

router.use(authMiddleware);

// Nested task routes for a specific project
router.use('/:projectId/tasks', projectTaskRouter);

// Main project routes
router.get('/', getProjects);
router.post('/', createProjectValidator, validateMiddleware, createProject);
router.get('/:id', projectIdParamValidator, validateMiddleware, getProjectById);
router.patch('/:id', updateProjectValidator, validateMiddleware, updateProject);
router.delete('/:id', projectIdParamValidator, validateMiddleware, deleteProject);

export default router;
