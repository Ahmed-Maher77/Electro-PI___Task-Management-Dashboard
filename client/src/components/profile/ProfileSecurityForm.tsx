import React from 'react';
import { Shield, Smartphone, Check, AlertCircle } from 'lucide-react';
import { Spinner } from '../Loader';

interface ProfileSecurityFormProps {
  currentPassword: string;
  setCurrentPassword: (val: string) => void;
  newPassword: string;
  setNewPassword: (val: string) => void;
  confirmPassword: string;
  setConfirmPassword: (val: string) => void;
  isPasswordUpdating: boolean;
  passwordMsg: { type: 'success' | 'error'; text: string } | null;
  onPasswordSubmit: (e: React.FormEvent) => void;
  is2FAEnabled: boolean;
  setIs2FAEnabled: (val: boolean) => void;
}

export const ProfileSecurityForm: React.FC<ProfileSecurityFormProps> = ({
  currentPassword,
  setCurrentPassword,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  isPasswordUpdating,
  passwordMsg,
  onPasswordSubmit,
  is2FAEnabled,
  setIs2FAEnabled,
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-md overflow-hidden text-xs space-y-6 p-6">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
        <Shield className="w-4 h-4 text-blue-600" />
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          الأمان والتحقق (SECURITY & AUTHENTICATION)
        </h2>
      </div>

      <form onSubmit={onPasswordSubmit} className="space-y-4">
        <h3 className="font-bold text-slate-900 text-sm">تغيير كلمة المرور</h3>

        {passwordMsg && (
          <div
            className={`p-3 rounded-md border text-xs flex items-center gap-2 ${
              passwordMsg.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                : 'bg-red-50 border-red-200 text-red-700'
            }`}
          >
            {passwordMsg.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span>{passwordMsg.text}</span>
          </div>
        )}

        <div className="space-y-3 max-w-lg">
          <div className="space-y-1">
            <label className="block font-semibold text-slate-700">كلمة المرور الحالية</label>
            <input
              type="password"
              placeholder="••••••••••••"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full bg-white text-slate-900 border border-slate-300 rounded-md px-3.5 py-2.5 focus:border-blue-600 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-semibold text-slate-700">كلمة المرور الجديدة</label>
            <input
              type="password"
              placeholder="أدخل كلمة المرور الجديدة"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-white text-slate-900 border border-slate-300 rounded-md px-3.5 py-2.5 focus:border-blue-600 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-semibold text-slate-700">تأكيد كلمة المرور الجديدة</label>
            <input
              type="password"
              placeholder="تأكيد كلمة المرور الجديدة"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-white text-slate-900 border border-slate-300 rounded-md px-3.5 py-2.5 focus:border-blue-600 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex justify-start pt-1">
          <button
            type="submit"
            disabled={isPasswordUpdating}
            className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-medium py-2 px-4 rounded-md transition-colors flex items-center gap-2"
          >
            {isPasswordUpdating && <Spinner size="sm" />}
            <span>{isPasswordUpdating ? 'جاري الحفظ...' : 'تحديث كلمة المرور'}</span>
          </button>
        </div>
      </form>

      {/* 2FA Banner Box */}
      <div className="border border-slate-200 bg-slate-50/50 rounded-md p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-blue-600 text-white flex items-center justify-center font-bold">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-slate-900">التحقق بخطوتين (2FA)</p>
            <p className="text-slate-500 text-[11px] mt-0.5">
              تعزيز أمان حسابك عن طريق تفعيل رمز التحقق بخطوتين عند تسجيل الدخول.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIs2FAEnabled(!is2FAEnabled)}
          className={`px-4 py-2 rounded-md font-medium text-xs transition-colors ${
            is2FAEnabled
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {is2FAEnabled ? 'مفعل (2FA Enabled)' : 'تفعيل التحقق بخطوتين'}
        </button>
      </div>
    </div>
  );
};
