import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreVertical, ChevronRight, ChevronLeft, User as UserIcon, Edit, Trash2 } from 'lucide-react';
import type { Project } from '../../types';

interface ProjectsTableProps {
  loading: boolean;
  error: string;
  projects: Project[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  startIndex: number;
  endIndex: number;
  onPageChange: (page: number) => void;
  onEditProject?: (p: Project) => void;
  onDeleteProject: (p: Project) => void;
}

export const ProjectsTable: React.FC<ProjectsTableProps> = ({
  loading,
  error,
  projects,
  totalItems,
  totalPages,
  currentPage,
  startIndex,
  endIndex,
  onPageChange,
  onEditProject,
  onDeleteProject,
}) => {
  const navigate = useNavigate();
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'critical':
        return { label: 'حرج', className: 'text-red-600' };
      case 'on-hold':
        return { label: 'معلق', className: 'text-amber-700' };
      case 'completed':
        return { label: 'مكتمل', className: 'text-blue-600' };
      case 'in-progress':
      default:
        return { label: 'قيد التنفيذ', className: 'text-blue-600' };
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-md overflow-hidden">
      {loading ? (
        <div className="p-12 text-center text-xs font-medium text-slate-500">
          جاري تحميل قائمة المشاريع...
        </div>
      ) : error ? (
        <div className="p-6 bg-red-50 text-red-700 text-xs text-center">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px] font-bold">
                <th className="py-3.5 px-5">اسم المشروع</th>
                <th className="py-3.5 px-5">الحالة</th>
                <th className="py-3.5 px-5">المسؤول</th>
                <th className="py-3.5 px-5">تاريخ الاستحقاق</th>
                <th className="py-3.5 px-5">نسبة الإنجاز</th>
                <th className="py-3.5 px-5 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    لا توجد مشاريع مطابقة للفلاتر المحددة.
                  </td>
                </tr>
              ) : (
                projects.map((p) => {
                  const projectId = p._id || p.id || '';
                  const badge = getStatusBadge(p.status);
                  const isCritical = p.status === 'critical';

                  return (
                    <tr
                      key={projectId}
                      className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                      onClick={(e) => {
                        if ((e.target as HTMLElement).closest('.action-menu-container')) return;
                        navigate(`/projects/${projectId}`);
                      }}
                    >
                      {/* Title & Subtitle */}
                      <td className="py-4 px-5">
                        <p className="font-bold text-slate-900 text-sm leading-snug hover:text-blue-600 transition-colors">
                          {p.title}
                        </p>
                        <p className="text-slate-400 text-[11px] mt-0.5">{p.subtitle || 'تطوير المنصة'}</p>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-5">
                        <span className={`inline-block px-2.5 py-1 rounded text-[11px] font-bold ${badge.className}`}>
                          {badge.label}
                        </span>
                      </td>

                      {/* Lead */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-[10px]">
                            {p.leadName ? p.leadName.charAt(0) : <UserIcon className="w-3 h-3" />}
                          </div>
                          <span className="font-medium text-slate-800">{p.leadName || 'أحمد ماهر'}</span>
                        </div>
                      </td>

                      {/* Due Date */}
                      <td className="py-4 px-5 font-medium text-slate-600 whitespace-nowrap">
                        {p.dueDate || '24 أكتوبر 2024'}
                      </td>

                      {/* Progress */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3 w-44">
                          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${isCritical ? 'bg-red-600' : 'bg-blue-600'}`}
                              style={{ width: `${p.progress || 0}%` }}
                            />
                          </div>
                          <span className="font-bold text-slate-700 text-[11px]">{p.progress || 0}%</span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-5 text-center relative action-menu-container" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => setActiveMenuId(activeMenuId === projectId ? null : projectId)}
                          className="p-1 text-slate-400 hover:text-slate-700 rounded transition-colors"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>

                        {activeMenuId === projectId && (
                          <div className="absolute left-4 top-10 w-36 bg-white border border-slate-200 rounded-md z-20 py-1 text-right text-xs shadow-md">
                            <button
                              onClick={() => {
                                setActiveMenuId(null);
                                if (onEditProject) {
                                  onEditProject(p);
                                } else {
                                  navigate(`/projects/${projectId}`);
                                }
                              }}
                              className="w-full text-right px-3 py-1.5 hover:bg-slate-50 text-slate-700 flex items-center gap-1.5"
                            >
                              <Edit className="w-3.5 h-3.5" />
                              <span>تعديل المشروع</span>
                            </button>
                            <button
                              onClick={() => {
                                setActiveMenuId(null);
                                onDeleteProject(p);
                              }}
                              className="w-full text-right px-3 py-1.5 hover:bg-red-50 text-red-600 font-medium flex items-center gap-1.5"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>حذف المشروع</span>
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Real Dynamic Pagination Controls */}
      <div className="bg-slate-50/50 border-t border-slate-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
        <p>
          عرض{' '}
          <span className="font-semibold text-slate-800">
            {totalItems === 0 ? 0 : startIndex + 1}
          </span>{' '}
          إلى{' '}
          <span className="font-semibold text-slate-800">{endIndex}</span> من أصل{' '}
          <span className="font-semibold text-slate-800">{totalItems}</span> مشروعاً
        </p>

        <div className="flex items-center gap-1 font-medium">
          <button
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="w-7 h-7 flex items-center justify-center border border-slate-200 bg-white rounded text-slate-600 hover:bg-slate-100 disabled:opacity-40"
            title="الصفحة السابقة"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-7 h-7 flex items-center justify-center rounded font-bold transition-colors ${
                currentPage === page
                  ? 'bg-blue-600 text-white'
                  : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="w-7 h-7 flex items-center justify-center border border-slate-200 bg-white rounded text-slate-600 hover:bg-slate-100 disabled:opacity-40"
            title="الصفحة التالية"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
