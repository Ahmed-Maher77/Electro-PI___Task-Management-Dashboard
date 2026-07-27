import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

export const Profile: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="space-y-6 max-w-xl">
      <div>
        <h1 className="text-xl font-bold text-slate-900">الملف الشخصي</h1>
        <p className="text-slate-500 text-xs mt-1">إدارة معلومات الحساب الخاص بك والتفضيلات.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-md p-6 space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            الاسم الكامل
          </label>
          <p className="text-slate-900 text-sm font-medium">{user?.name || 'غير متوفر'}</p>
        </div>
        <div className="border-t border-slate-100 pt-3">
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            البريد الإلكتروني
          </label>
          <p className="text-slate-900 text-sm font-medium">{user?.email || 'غير متوفر'}</p>
        </div>
        <div className="border-t border-slate-100 pt-3">
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            الصلاحية
          </label>
          <p className="text-slate-900 text-sm font-medium">{user?.role === 'admin' ? 'مدير' : 'مستخدم'}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
