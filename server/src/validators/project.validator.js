import { body, param } from 'express-validator';

export const createProjectValidator = [
  body('title').trim().notEmpty().withMessage('عنوان المشروع مطلوب'),
  body('subtitle').optional().isString(),
  body('description').optional().isString(),
  body('leadName').optional().isString(),
  body('dueDate').optional().isString(),
  body('progress').optional().isNumeric(),
  body('status')
    .optional()
    .isIn(['in-progress', 'critical', 'on-hold', 'completed', 'active', 'archived'])
    .withMessage('حالة غير صالحة'),
];

export const updateProjectValidator = [
  param('id').isMongoId().withMessage('معرف مشروع غير صالح'),
  body('title').optional().trim().notEmpty().withMessage('لا يمكن أن يكون العنوان فارغاً'),
  body('status')
    .optional()
    .isIn(['in-progress', 'critical', 'on-hold', 'completed', 'active', 'archived'])
    .withMessage('حالة غير صالحة'),
];

export const projectIdParamValidator = [
  param('id').isMongoId().withMessage('معرف مشروع غير صالح'),
];
