import { body, param } from 'express-validator';

export const createProjectValidator = [
  body('title').trim().notEmpty().withMessage('Project title is required'),
  body('description').optional().isString(),
];

export const updateProjectValidator = [
  param('id').isMongoId().withMessage('Invalid project ID'),
  body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
  body('status').optional().isIn(['active', 'completed', 'archived']).withMessage('Invalid status'),
];

export const projectIdParamValidator = [
  param('id').isMongoId().withMessage('Invalid project ID'),
];
