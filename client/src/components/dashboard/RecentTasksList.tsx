import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Link as LinkIcon } from 'lucide-react';
import type { Task } from '../../types';
import { Spinner } from '../Loader';

interface RecentTasksListProps {
  isLoading: boolean;
  tasks: Task[];
  onTaskStatusChange?: (taskId: string, newStatus: Task['status']) => void;
}

export const RecentTasksList: React.FC<RecentTasksListProps> = ({
  isLoading,
  tasks,
  onTaskStatusChange,
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-slate-200 rounded-md p-5 flex flex-col justify-between space-y-4">
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <h2 className="text-sm font-bold text-slate-900">سجل المهام والعمل المباشر</h2>
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
                className="border border-slate-200 hover:border-blue-300 rounded-md p-3.5 space-y-2 bg-slate-50/50 hover:bg-white transition-all"
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span
                    className={`px-2 py-0.5 rounded font-bold ${
                      t.priority === 'high'
                        ? 'text-red-600'
                        : t.priority === 'medium'
                        ? 'text-blue-600'
                        : 'text-slate-600'
                    }`}
                  >
                    {t.priority === 'high' ? 'عالية' : t.priority === 'medium' ? 'متوسطة' : 'منخفضة'}
                  </span>

                  {/* Direct Status Changer Selector */}
                  {onTaskStatusChange ? (
                    <select
                      value={t.status === 'in-progress' ? 'doing' : t.status}
                      onChange={(e) => onTaskStatusChange(taskId, e.target.value as Task['status'])}
                      className="bg-white border border-slate-300 rounded px-2 py-0.5 text-[10px] font-bold text-slate-800 focus:border-blue-600 focus:outline-none cursor-pointer"
                    >
                      <option value="todo">قيد الانتظار</option>
                      <option value="doing">قيد العمل</option>
                      <option value="review">مراجعة</option>
                      <option value="done">مكتملة</option>
                    </select>
                  ) : (
                    <span className="text-slate-500 font-medium">{t.dueDate || 'بدون تاريخ'}</span>
                  )}
                </div>

                <p
                  onClick={() => navigate('/tasks')}
                  className="text-xs font-semibold text-slate-800 leading-snug truncate cursor-pointer hover:text-blue-600 transition-colors"
                >
                  {t.title}
                </p>

                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-0.5">
                  <div className="flex items-center gap-1.5">
                    <LinkIcon className="w-3 h-3" />
                    <span>{t.taskIdCode || 'TASK'}</span>
                  </div>
                  <span className="font-sans text-[10px] text-slate-500">{t.assigneeName || 'غير مسند'}</span>
                </div>
              </div>
            );
          })
        )}
      </div>

      <button
        onClick={() => navigate('/tasks/new')}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition-colors text-xs flex items-center justify-center gap-1.5"
      >
        + إضافة مهمة سريعة
      </button>
    </div>
  );
};
