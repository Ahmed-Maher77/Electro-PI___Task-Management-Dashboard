import React, { useState } from 'react';
import { Lock, KeyRound, ShieldAlert } from 'lucide-react';
import { updatePasswordApi } from '../../api/auth.api';
import { Spinner } from '../Loader';

export const SecuritySettingsForm: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg('');
    setErrorMsg('');

    if (!currentPassword) {
      setErrorMsg('يرجى إدخال كلمة المرور الحالية');
      return;
    }
    if (newPassword.length < 6) {
      setErrorMsg('كلمة المرور الجديدة يجب أن تحتوي على 6 أحرف على الأقل');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMsg('كلمة المرور الجديدة وتأكيدها غير متطابقين');
      return;
    }

    try {
      setIsSubmitting(true);
      await updatePasswordApi({ currentPassword, newPassword });
      setStatusMsg('تم تحديث كلمة المرور وحماية الحساب بنجاح في قاعدة البيانات');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setStatusMsg(''), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || 'فشل تحديث كلمة المرور، يرجى التأكد من صحة كلمة المرور الحالية');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 text-xs">
      <div className="border-b border-slate-200 pb-3">
        <h2 className="text-sm font-bold text-slate-900">الأمان وكلمة المرور</h2>
        <p className="text-[11px] text-slate-500 mt-0.5">تحديث كلمة المرور الخاصة بك وتأمين الجلسة الحالية في قاعدة البيانات.</p>
      </div>

      {statusMsg && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-md font-medium">
          {statusMsg}
        </div>
      )}

      {errorMsg && (
        <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-md font-medium">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
        <div className="space-y-1.5">
          <label className="block font-bold text-slate-700 flex items-center gap-1.5">
            <KeyRound className="w-3.5 h-3.5 text-slate-400" />
            <span>كلمة المرور الحالية</span>
          </label>
          <input
            type="password"
            required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-white text-slate-900 border border-slate-300 rounded-md px-3.5 py-2.5 focus:border-blue-600 focus:outline-none dir-ltr text-left"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block font-bold text-slate-700 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-slate-400" />
            <span>كلمة المرور الجديدة</span>
          </label>
          <input
            type="password"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-white text-slate-900 border border-slate-300 rounded-md px-3.5 py-2.5 focus:border-blue-600 focus:outline-none dir-ltr text-left"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block font-bold text-slate-700 flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-slate-400" />
            <span>تأكيد كلمة المرور الجديدة</span>
          </label>
          <input
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-white text-slate-900 border border-slate-300 rounded-md px-3.5 py-2.5 focus:border-blue-600 focus:outline-none dir-ltr text-left"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium py-2.5 px-5 rounded-md transition-colors text-xs flex items-center gap-2 cursor-pointer"
          >
            {isSubmitting ? <Spinner size="sm" /> : null}
            <span>{isSubmitting ? 'جاري التحديث...' : 'تحديث كلمة المرور'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
