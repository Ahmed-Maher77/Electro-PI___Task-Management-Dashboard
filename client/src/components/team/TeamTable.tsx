import React from 'react';
import { Mail, MoreVertical } from 'lucide-react';
import type { TeamMember } from '../../types';
import { Spinner } from '../Loader';

interface TeamTableProps {
  isLoading: boolean;
  members: TeamMember[];
  activeMenuId: string | null;
  setActiveMenuId: (id: string | null) => void;
  onDeleteMember: (id: string, name: string) => void;
}

export const TeamTable: React.FC<TeamTableProps> = ({
  isLoading,
  members,
  activeMenuId,
  setActiveMenuId,
  onDeleteMember,
}) => {
  if (isLoading) {
    return (
      <div className="p-12 text-center text-slate-500 flex items-center justify-center gap-2 text-xs font-semibold">
        <Spinner size="sm" />
        <span>جاري تحميل أعضاء الفريق...</span>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-right border-collapse text-xs">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px] font-bold">
            <th className="py-3.5 px-5">العضو</th>
            <th className="py-3.5 px-5">البريد الإلكتروني</th>
            <th className="py-3.5 px-5">المسمى الوظيفي</th>
            <th className="py-3.5 px-5">المشاريع</th>
            <th className="py-3.5 px-5">الحالة</th>
            <th className="py-3.5 px-5 text-center">الإجراءات</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {members.length === 0 ? (
            <tr>
              <td colSpan={6} className="py-8 text-center text-slate-400">
                لا يوجد أعضاء مطابقين للبحث.
              </td>
            </tr>
          ) : (
            members.map((m) => (
              <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                
                {/* Member Name & Avatar */}
                <td className="py-4 px-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs">
                      {m.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm leading-snug">{m.name}</p>
                      <p className="text-slate-400 text-[11px]">{m.department}</p>
                    </div>
                  </div>
                </td>

                {/* Email */}
                <td className="py-4 px-5 text-slate-600 font-medium dir-ltr text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <span>{m.email}</span>
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                </td>

                {/* Role Badge */}
                <td className="py-4 px-5">
                  <span className={`inline-block px-2.5 py-1 rounded text-[11px] font-bold border ${m.roleBadge}`}>
                    {m.role}
                  </span>
                </td>

                {/* Projects Count */}
                <td className="py-4 px-5 font-bold text-slate-700">
                  {m.projectsCount} مشاريع
                </td>

                {/* Status */}
                <td className="py-4 px-5">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold ${
                      m.status === 'active'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {m.status === 'active' ? 'نشط (Active)' : 'دعوة معلقة'}
                  </span>
                </td>

                {/* Actions */}
                <td className="py-4 px-5 text-center relative">
                  <button
                    onClick={() => setActiveMenuId(activeMenuId === m.id ? null : m.id)}
                    className="p-1 text-slate-400 hover:text-slate-700 rounded transition-colors"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>

                  {activeMenuId === m.id && (
                    <div className="absolute left-4 top-10 w-36 bg-white border border-slate-200 rounded-md z-20 py-1 text-right text-xs">
                      <button
                        onClick={() => {
                          alert(`تراسل مع: ${m.email}`);
                          setActiveMenuId(null);
                        }}
                        className="w-full text-right px-3 py-1.5 hover:bg-slate-50 text-slate-700"
                      >
                        مراسلة العضو
                      </button>
                      <button
                        onClick={() => onDeleteMember(m.id, m.name)}
                        className="w-full text-right px-3 py-1.5 hover:bg-red-50 text-red-600"
                      >
                        إزالة من الفريق
                      </button>
                    </div>
                  )}
                </td>

              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
