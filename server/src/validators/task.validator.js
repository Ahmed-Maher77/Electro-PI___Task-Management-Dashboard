import { body, param } from 'express-validator';

export const createTaskValidator = [
  param('projectId').isMongoId().withMessage('معرف مشروع غير صالح'),
  body('title').trim().notEmpty().withMessage('عنوان المهمة مطلوب'),
  body('priority').optional().isIn(['low', 'medium', 'high', 'urgent']).withMessage('أولوية غير صالحة'),
];

export const updateTaskValidator = [
  param('id').isMongoId().withMessage('معرف مهمة غير صالح'),
  body('title').optional().trim().notEmpty().withMessage('عنوان المهمة لا يمكن أن يكون فارغاً'),
  body('description').optional().trim(),
  body('assigneeName').optional().trim(),
  body('dueDate').optional().trim(),
  body('status').optional().isIn(['todo', 'doing', 'review', 'done', 'in-progress']).withMessage('حالة غير صالحة'),
  body('priority').optional().isIn(['low', 'medium', 'high', 'urgent']).withMessage('أولوية غير صالحة'),
];

export const taskIdParamValidator = [
  param('id').isMongoId().withMessage('معرف مهمة غير صالح'),
];
