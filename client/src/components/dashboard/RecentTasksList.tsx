import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Link as LinkIcon } from 'lucide-react';
import type { Task } from '../../types';
import { Spinner } from '../Loader';

interface RecentTasksListProps {
  isLoading: boolean;
  tasks: Task[];
}

export const RecentTasksList: React.FC<RecentTasksListProps> = ({ isLoading, tasks }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-slate-200 rounded-md p-5 flex flex-col justify-between space-y-4">
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <h2 className="text-sm font-bold text-slate-900">سجل المهام</h2>
        <Link to="/tasks" className="text-xs font-semibold text-blue-600 hover:underline">
          عرض الكل
        </Link>
      </div>

      <div className="space-y-3 flex-1">
        {isLoading ? (
          <div className="p-6 text-center text-slate-400 text-xs flex items-center justify-center gap-2">
            <Spinner size="sm" />
            <span>جاري التحميل...</span>
          </div>
        ) : tasks.length === 0 ? (
          <div className="p-6 text-center text-slate-400 text-xs">
            لا توجد مهام مسجلة.
          </div>
        ) : (
          tasks.map((t) => {
            const taskId = t._id || t.id || '';
            return (
              <div
                key={taskId}
                onClick={() => navigate('/tasks')}
                className="border border-slate-200 hover:border-blue-300 rounded-md p-3.5 space-y-2 bg-slate-50/50 hover:bg-white transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span
                    className={`px-2 py-0.5 rounded font-bold border ${
                      t.priority === 'high'
                        ? 'text-red-600 '
                        : t.priority === 'medium'
                        ? 'text-blue-600'
                        : 'text-slate-600'
                    }`}
                  >
                    {t.priority === 'high' ? 'عالية' : t.priority === 'medium' ? 'متوسطة' : 'منخفضة'}
                  </span>
                  <span className="text-slate-500 font-medium">{t.dueDate || 'بدون تاريخ'}</span>
                </div>
                <p className="text-xs font-semibold text-slate-800 leading-snug truncate">{t.title}</p>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
                  <LinkIcon className="w-3 h-3" />
                  <span>{t.taskIdCode || 'TASK'}</span>
                </div>
              </div>
            );
          })
        )}
      </div>

      <button
        onClick={() => navigate('/tasks')}
        className="w-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-medium py-2 rounded-md transition-colors text-xs"
      >
        إدارة المهام المباشرة
      </button>
    </div>
  );
};
