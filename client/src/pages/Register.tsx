import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerApi } from '../api/auth.api';
import { setUser } from '../store/authSlice';
import { Input } from '../components/Input';
import { AuthHeader } from '../components/AuthHeader';
import { AuthFooter } from '../components/AuthFooter';
import { registerSchema, type RegisterFormData } from '../utils/validators';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [serverError, setServerError] = useState('');

  // Form setup with React Hook Form and Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeTerms: false,
    },
  });

  // Handle Registration submission
  const onSubmit = async (data: RegisterFormData) => {
    setServerError('');
    try {
      const response = await registerApi({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      dispatch(setUser(response.data.user));
      navigate('/dashboard');
    } catch (err: any) {
      setServerError(err.message || 'فشل إنشاء الحساب، يرجى المحاولة مرة أخرى');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 text-center space-y-6">
        
        <AuthHeader subtitle="أدخل بياناتك لإنشاء مساحة العمل الخاصة بك" />

        {serverError && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md text-right">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <Input
            label="الاسم الكامل"
            type="text"
            placeholder="مثال: أحمد محمود"
            error={errors.name?.message}
            {...register('name')}
          />

          <Input
            label="البريد الإلكتروني"
            type="email"
            placeholder="work@electro-pi.com"
            error={errors.email?.message}
            {...register('email')}
          />

          <Input
            label="كلمة المرور"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register('password')}
          />

          <Input
            label="تأكيد كلمة المرور"
            type="password"
            placeholder="••••••••"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />

          <div className="space-y-1 text-right pt-1">
            <div className="flex items-center gap-2">
              <input
                id="terms"
                type="checkbox"
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                {...register('agreeTerms')}
              />
              <label htmlFor="terms" className="text-xs text-slate-600 select-none cursor-pointer">
                أوافق على{' '}
                <a href="#terms" onClick={(e) => e.preventDefault()} className="text-blue-600 hover:underline">
                  شروط الخدمة
                </a>{' '}
                و{' '}
                <a href="#privacy" onClick={(e) => e.preventDefault()} className="text-blue-600 hover:underline">
                  سياسة الخصوصية
                </a>
                .
              </label>
            </div>
            {errors.agreeTerms && (
              <p className="text-xs text-red-600 font-medium pt-0.5">{errors.agreeTerms.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium py-2.5 px-4 rounded-md transition-colors text-sm flex items-center justify-center gap-2"
          >
            <span>{isSubmitting ? 'جاري إنشاء الحساب...' : 'إنشاء حساب'}</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </form>

        <div className="border-t border-slate-100 pt-4">
          <AuthFooter
            promptText="لديك حساب بالفعل؟"
            linkText="تسجيل الدخول"
            linkTo="/login"
            footerLinks={[
              { label: 'الدعم', href: '#support' },
              { label: 'التوثيق', href: '#docs' },
              { label: 'الحالة', href: '#status' },
            ]}
          />
        </div>

      </div>
    </div>
  );
};

export default Register;
