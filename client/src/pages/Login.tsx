import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginApi } from '../api/auth.api';
import { setUser } from '../store/authSlice';
import { Input } from '../components/Input';
import { AuthHeader } from '../components/AuthHeader';
import { AuthFooter } from '../components/AuthFooter';
import { loginSchema, type LoginFormData } from '../utils/validators';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [serverError, setServerError] = useState('');

  // Form setup with React Hook Form and Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  // Handle Login submission
  const onSubmit = async (data: LoginFormData) => {
    setServerError('');
    try {
      const response = await loginApi(data);
      dispatch(setUser(response.data.user));
      navigate('/dashboard');
    } catch (err: any) {
      setServerError(err.message || 'فشل تسجيل الدخول، يرجى التأكد من صحة البيانات');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 text-center space-y-6">
        
        <AuthHeader subtitle="وصول المستوى المؤسسي" />

        {serverError && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md text-right">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <Input
            label="البريد الإلكتروني"
            type="email"
            placeholder="name@company.com"
            error={errors.email?.message}
            {...register('email')}
          />

          <Input
            label="كلمة المرور"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            topRightLabel={
              <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-blue-600 hover:underline text-xs">
                نسيت كلمة المرور؟
              </a>
            }
            {...register('password')}
          />

          <div className="flex items-center gap-2 pt-1 text-right">
            <input
              id="remember"
              type="checkbox"
              className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              {...register('rememberMe')}
            />
            <label htmlFor="remember" className="text-xs text-slate-600  cursor-pointer">
              تذكرني
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium py-2.5 px-4 rounded-md transition-colors text-sm"
          >
            {isSubmitting ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
          </button>
        </form>

        <div className="border-t border-slate-100 pt-4">
          <AuthFooter
            promptText="ليس لديك حساب؟"
            linkText="إنشاء حساب"
            linkTo="/register"
            footerLinks={[
              { label: 'سياسة الخصوصية', href: '#privacy' },
              { label: 'شروط الخدمة', href: '#terms' },
            ]}
          />
        </div>

      </div>
    </div>
  );
};

export default Login;
