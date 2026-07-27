import { body } from 'express-validator';

export const registerValidator = [
  body('name').trim().notEmpty().withMessage('الاسم الكامل مطلوب'),
  body('email').isEmail().withMessage('يرجى إدخال بريد إلكتروني صحيح'),
  body('password').isLength({ min: 6 }).withMessage('كلمة المرور يجب أن لا تقل عن 6 أحرف'),
];

export const loginValidator = [
  body('email').isEmail().withMessage('يرجى إدخال بريد إلكتروني صحيح'),
  body('password').notEmpty().withMessage('كلمة المرور مطلوبة'),
];
