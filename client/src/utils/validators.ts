import { z } from 'zod';

// Login Validation Schema
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'البريد الإلكتروني مطلوب')
    .email('يرجى إدخال بريد إلكتروني صحيح'),
  password: z.string().min(1, 'كلمة المرور مطلوبة'),
  rememberMe: z.boolean().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Register Validation Schema
export const registerSchema = z
  .object({
    name: z.string().min(1, 'الاسم الكامل مطلوب'),
    email: z
      .string()
      .min(1, 'البريد الإلكتروني مطلوب')
      .email('يرجى إدخال بريد إلكتروني صحيح'),
    password: z.string().min(6, 'كلمة المرور يجب أن لا تقل عن 6 أحرف'),
    confirmPassword: z.string().min(1, 'تأكيد كلمة المرور مطلوب'),
    agreeTerms: z.boolean().refine((val) => val === true, {
      message: 'يجب الموافقة على شروط الخدمة وسياسة الخصوصية للمتابعة',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'كلمة المرور وتأكيد كلمة المرور غير متطابقين',
    path: ['confirmPassword'],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
