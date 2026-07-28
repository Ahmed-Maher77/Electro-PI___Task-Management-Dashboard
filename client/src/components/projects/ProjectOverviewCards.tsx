import React from 'react';
import { Info, UserPlus, Users } from 'lucide-react';
import type { Project } from '../../types';

interface ProjectOverviewCardsProps {
  project: Project | null;
  onAddMemberClick: () => void;
  onManageMembersClick: () => void;
}

export const ProjectOverviewCards: React.FC<ProjectOverviewCardsProps> = ({
  project,
  onAddMemberClick,
  onManageMembersClick,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Description Card */}
      <div className="lg:col-span-2 bg-white border border-slate-200 rounded-md p-6 space-y-6 flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">وصف المشروع</h2>
            <Info className="w-4 h-4 text-slate-400" />
          </div>

          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            {project?.description ||
              'تطوير وتحديث شامل للمنصة والتأكد من دعم كافة الخصائص المتقدمة وإدارة المهام بسلاسة عالية مع مزامنة كاملة لقواعد البيانات.'}
          </p>
        </div>

        {/* Meta Footer Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-100 pt-4 text-xs">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">تاريخ البدء</p>
            <p className="font-bold text-slate-800 mt-1">12 أكتوبر 2024</p>
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">تاريخ الاستحقاق</p>
            <p className="font-bold text-slate-800 mt-1">{project?.dueDate || '28 يناير 2025'}</p>
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">الأولوية</p>
            <p className="font-bold text-red-600 mt-1">عالية</p>
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">مالك المشروع</p>
            <p className="font-bold text-blue-600 mt-1">{project?.leadName || 'أحمد ماهر'}</p>
          </div>
        </div>
      </div>

      {/* Team Members Card */}
      <div className="bg-white border border-slate-200 rounded-md p-6 space-y-4 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">أعضاء الفريق</h2>
            <button
              onClick={onManageMembersClick}
              className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
              title="إدارة المساهمين وأدوارهم"
            >
              <Users className="w-3.5 h-3.5" />
              <span>إدارة</span>
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs">
                س
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">سارة محمود</p>
                <p className="text-[11px] text-slate-400">قائد الفريق</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs">
                أ
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">أحمد ماهر</p>
                <p className="text-[11px] text-slate-400">مطور تطبيقات</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs">
                م
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">محمد علي</p>
                <p className="text-[11px] text-slate-400">مصمم واجهات</p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={onAddMemberClick}
          className="w-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-medium py-2 rounded-md transition-colors text-xs flex items-center justify-center gap-1.5"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>إضافة مساهم</span>
        </button>
      </div>
    </div>
  );
};
