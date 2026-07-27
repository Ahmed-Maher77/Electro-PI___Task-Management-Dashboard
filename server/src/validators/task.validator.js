import { body, param } from 'express-validator';

export const createTaskValidator = [
  param('projectId').isMongoId().withMessage('Invalid project ID'),
  body('title').trim().notEmpty().withMessage('Task title is required'),
  body('priority').optional().isIn(['low', 'medium', 'high']).withMessage('Invalid priority'),
];

export const updateTaskValidator = [
  param('id').isMongoId().withMessage('Invalid task ID'),
  body('status').optional().isIn(['todo', 'in-progress', 'done']).withMessage('Invalid status'),
  body('priority').optional().isIn(['low', 'medium', 'high']).withMessage('Invalid priority'),
];

export const taskIdParamValidator = [
  param('id').isMongoId().withMessage('Invalid task ID'),
];
