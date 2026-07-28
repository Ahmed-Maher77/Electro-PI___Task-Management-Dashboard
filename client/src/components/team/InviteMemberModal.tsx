import React from 'react';
import { UserPlus, X } from 'lucide-react';
import { Spinner } from '../Loader';

interface InviteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  name: string;
  setName: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  role: string;
  setRole: (val: string) => void;
  department: string;
  setDepartment: (val: string) => void;
  isSubmitting: boolean;
}

export const InviteMemberModal: React.FC<InviteMemberModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  name,
  setName,
  email,
  setEmail,
  role,
  setRole,
  department,
  setDepartment,
  isSubmitting,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-md max-w-md w-full p-6 text-right space-y-4">
        
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-bold text-slate-900 text-base">دعوة عضو جديد للفريق</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="block font-bold text-slate-700">الاسم الكامل</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="أدخل اسم العضو..."
              className="w-full bg-white border border-slate-300 rounded-md px-3.5 py-2 text-slate-900 focus:border-blue-600 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block font-bold text-slate-700">البريد الإلكتروني</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="member@electro-pi.com"
              className="w-full bg-white border border-slate-300 rounded-md px-3.5 py-2 text-slate-900 focus:border-blue-600 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block font-bold text-slate-700">الصلاحية (Role)</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-slate-800 focus:border-blue-600 focus:outline-none font-medium"
              >
                <option value="member">عضو (Developer)</option>
                <option value="admin">مسؤول (Admin)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block font-bold text-slate-700">القسم</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-slate-800 focus:border-blue-600 focus:outline-none font-medium"
              >
                <option value="تطوير البرمجيات">تطوير البرمجيات</option>
                <option value="البنية التحتية">البنية التحتية</option>
                <option value="التصميم والتجربة">التصميم والتجربة</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 rounded-md text-slate-700 hover:bg-slate-50 font-medium"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-md font-medium flex items-center gap-2"
            >
              {isSubmitting ? <Spinner size="sm" /> : <UserPlus className="w-4 h-4" />}
              <span>إضافة العضو</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
