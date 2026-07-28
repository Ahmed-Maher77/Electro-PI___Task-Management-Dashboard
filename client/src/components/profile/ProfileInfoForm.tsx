import React from 'react';
import { Camera, Lock, Check, AlertCircle } from 'lucide-react';
import { Spinner } from '../Loader';

interface ProfileInfoFormProps {
  name: string;
  setName: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  role: string;
  department: string;
  setDepartment: (val: string) => void;
  isUpdating: boolean;
  successMsg: string;
  errMsg: string;
  onSubmit: (e: React.FormEvent) => void;
  userId?: string;
}

export const ProfileInfoForm: React.FC<ProfileInfoFormProps> = ({
  name,
  setName,
  email,
  setEmail,
  role,
  department,
  setDepartment,
  isUpdating,
  successMsg,
  errMsg,
  onSubmit,
  userId = 'USR-9942',
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-md overflow-hidden text-xs">
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex items-center justify-between">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          المعلومات الشخصية (PERSONAL INFORMATION)
        </h2>
        <span className="text-[11px] font-mono text-slate-400">ID: {userId}</span>
      </div>

      <form onSubmit={onSubmit} className="p-6 space-y-6">
        {successMsg && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-md flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>{successMsg}</span>
          </div>
        )}

        {errMsg && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span>{errMsg}</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="relative group cursor-pointer">
            <div className="w-20 h-20 rounded-full bg-slate-200 border-2 border-slate-300 flex items-center justify-center font-bold text-slate-700 text-2xl overflow-hidden">
              {name.charAt(0).toUpperCase()}
            </div>
            <div className="absolute bottom-0 left-0 bg-blue-600 text-white p-1 rounded-full border-2 border-white">
              <Camera className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 w-full">
            <div className="space-y-1.5">
              <label className="block font-semibold text-slate-700">الاسم الكامل</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white text-slate-900 border border-slate-300 rounded-md px-3.5 py-2.5 focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block font-semibold text-slate-700">البريد الإلكتروني</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white text-slate-900 border border-slate-300 rounded-md px-3.5 py-2.5 focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block font-semibold text-slate-700">الصلاحية / المسمى الوظيفي</label>
              <div className="relative">
                <input
                  type="text"
                  disabled
                  value={role}
                  className="w-full bg-slate-100 text-slate-500 border border-slate-200 rounded-md px-3.5 py-2.5 cursor-not-allowed pl-9"
                />
                <Lock className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block font-semibold text-slate-700">القسم / الإدارة</label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full bg-white text-slate-900 border border-slate-300 rounded-md px-3.5 py-2.5 focus:border-blue-600 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isUpdating}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium py-2.5 px-5 rounded-md transition-colors text-xs flex items-center gap-2"
          >
            {isUpdating && <Spinner size="sm" />}
            <span>{isUpdating ? 'جاري التحديث...' : 'تحديث الملف الشخصي'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
