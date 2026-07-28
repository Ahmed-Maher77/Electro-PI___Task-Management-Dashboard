import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Spinner } from '../Loader';
import type { RecentActivityProps } from '../../types';

export const RecentActivity: React.FC<RecentActivityProps> = ({
  isLoading,
  projectsCount,
  activities,
}) => {
  const navigate = useNavigate();

  return (
    <div className="lg:col-span-2 bg-white border border-slate-200 rounded-md p-5 flex flex-col space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h2 className="text-sm font-bold text-slate-900">النشاط الأخير وسجل المشاريع</h2>
        <Link to="/projects" className="text-xs font-semibold text-blue-600 hover:underline">
          عرض جميع المشاريع ({projectsCount})
        </Link>
      </div>

      {isLoading ? (
        <div className="p-8 text-center text-slate-400 text-xs flex items-center justify-center gap-2">
          <Spinner size="sm" />
          <span>جاري تحميل سجل النشاط والمشاريع الحقيقية...</span>
        </div>
      ) : activities.length === 0 ? (
        <div className="p-8 text-center text-slate-400 text-xs">
          لا توجد أنشطة أو مشاريع مسجلة حالياً.
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {activities.map((act) => {
            const Icon = act.icon;
            return (
              <div
                key={act.id}
                onClick={() => {
                  if (act.type === 'project' && act.rawId) {
                    navigate(`/projects/${act.rawId}`);
                  } else {
                    navigate('/tasks');
                  }
                }}
                className="py-3 flex items-center justify-between hover:bg-slate-50 px-2 rounded-md transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded flex items-center justify-center ${act.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-800 hover:text-blue-600 transition-colors">
                      {act.title}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{act.subtitle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-400">{act.date}</span>
                  <ChevronLeft className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
