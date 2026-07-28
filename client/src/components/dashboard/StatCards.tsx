import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, ClipboardList, CheckCircle2, Users } from 'lucide-react';
import { Spinner } from '../Loader';

interface StatCardsProps {
  isLoading: boolean;
  projectsCount: number;
  pendingTasksCount: number;
  highPriorityCount: number;
  completedTasksCount: number;
  completionRate: number;
  teamCount: number;
}

export const StatCards: React.FC<StatCardsProps> = ({
  isLoading,
  projectsCount,
  pendingTasksCount,
  highPriorityCount,
  completedTasksCount,
  completionRate,
  teamCount,
}) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      
      {/* Card 1: Total Projects */}
      <div
        onClick={() => navigate('/projects')}
        className="bg-white border border-slate-200 hover:border-blue-300 rounded-md p-5 flex items-center justify-between cursor-pointer transition-all hover:shadow-sm"
      >
        <div className="space-y-1">
          <p className="text-xs font-medium text-slate-500">إجمالي المشاريع</p>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900">
            {isLoading ? <Spinner size="sm" /> : projectsCount}
          </div>
          <p className="text-[11px] font-semibold text-blue-600 pt-0.5">
            مشاريع نشطة
          </p>
        </div>
        <div className="w-10 h-10 rounded bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
          <Rocket className="w-5 h-5" />
        </div>
      </div>

      {/* Card 2: Pending Tasks */}
      <div
        onClick={() => navigate('/tasks')}
        className="bg-white border border-slate-200 hover:border-blue-300 rounded-md p-5 flex items-center justify-between cursor-pointer transition-all hover:shadow-sm"
      >
        <div className="space-y-1">
          <p className="text-xs font-medium text-slate-500">المهام المعلقة</p>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900">
            {isLoading ? <Spinner size="sm" /> : pendingTasksCount}
          </div>
          <p className="text-[11px] font-semibold text-amber-600 pt-0.5">
            {highPriorityCount} عالية الأهمية
          </p>
        </div>
        <div className="w-10 h-10 rounded bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
          <ClipboardList className="w-5 h-5" />
        </div>
      </div>

      {/* Card 3: Completed Tasks */}
      <div
        onClick={() => navigate('/tasks')}
        className="bg-white border border-slate-200 hover:border-blue-300 rounded-md p-5 flex items-center justify-between cursor-pointer transition-all hover:shadow-sm"
      >
        <div className="space-y-1">
          <p className="text-xs font-medium text-slate-500">المهام المكتملة</p>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900">
            {isLoading ? <Spinner size="sm" /> : completedTasksCount}
          </div>
          <p className="text-[11px] font-semibold text-emerald-600 pt-0.5">
            {completionRate}% نسبة الإنجاز
          </p>
        </div>
        <div className="w-10 h-10 rounded bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
          <CheckCircle2 className="w-5 h-5" />
        </div>
      </div>

      {/* Card 4: Team Members */}
      <div
        onClick={() => navigate('/team')}
        className="bg-white border border-slate-200 hover:border-blue-300 rounded-md p-5 flex items-center justify-between cursor-pointer transition-all hover:shadow-sm"
      >
        <div className="space-y-1">
          <p className="text-xs font-medium text-slate-500">أعضاء الفريق</p>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900">
            {isLoading ? <Spinner size="sm" /> : teamCount}
          </div>
          <p className="text-[11px] font-semibold text-purple-600 pt-0.5">
            فريق العمل المباشر
          </p>
        </div>
        <div className="w-10 h-10 rounded bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
          <Users className="w-5 h-5" />
        </div>
      </div>

    </div>
  );
};
