import React from 'react';
import { Trash2, CheckSquare, ChevronRight, ChevronLeft } from 'lucide-react';
import type { Task } from '../../types';
import { Spinner } from '../Loader';

interface TasksTableProps {
  isLoading: boolean;
  tasks: Task[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  startIndex: number;
  endIndex: number;
  onPageChange: (page: number) => void;
  onStatusChange: (id: string, status: Task['status']) => void;
  onDeleteTask: (id: string) => void;
}

export const TasksTable: React.FC<TasksTableProps> = ({
  isLoading,
  tasks,
  totalItems,
  totalPages,
  currentPage,
  startIndex,
  endIndex,
  onPageChange,
  onStatusChange,
  onDeleteTask,
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-md overflow-hidden">
      {isLoading ? (
        <div className="p-12 text-center text-slate-500 flex items-center justify-center gap-2 text-xs font-semibold">
          <Spinner size="sm" />
          <span>جاري تحميل المهام...</span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px] font-bold">
                <th className="py-3.5 px-5 min-w-[90px]">المعرف</th>
                <th className="py-3.5 px-5">عنوان المهمة</th>
                <th className="py-3.5 px-5">المسند إليه</th>
                <th className="py-3.5 px-5">الأولوية</th>
                <th className="py-3.5 px-5">تغيير حالة المهمة</th>
                <th className="py-3.5 px-5">تاريخ الاستحقاق</th>
                <th className="py-3.5 px-5 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tasks.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400 space-y-2">
                    <CheckSquare className="w-8 h-8 mx-auto text-slate-300" />
                    <p>لا توجد مهام مطابقة للبحث.</p>
                  </td>
                </tr>
              ) : (
                tasks.map((t) => {
                  const taskId = t._id || t.id || '';
                  return (
                    <tr key={taskId} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-3 font-mono text-slate-500 text-[11px]">
                        {t.taskIdCode || 'TASK-100'}
                      </td>

                      <td className="py-4 px-5 max-w-xs">
                        <p className="font-bold text-slate-900 text-sm leading-snug truncate">{t.title}</p>
                        {t.description && (
                          <p className="text-slate-400 text-[11px] truncate mt-0.5">{t.description}</p>
                        )}
                      </td>

                      <td className="py-4 px-5">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-[10px]">
                            {(t.assigneeName || 'غير مسند').charAt(0)}
                          </div>
                          <span className="text-slate-700 font-medium">{t.assigneeName || 'غير مسند'}</span>
                        </div>
                      </td>

                      <td className="py-4 px-5">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold ${
                            t.priority === 'high'
                              ? 'text-red-600'
                              : t.priority === 'medium'
                              ? 'text-blue-600'
                              : 'text-slate-600'
                          }`}
                        >
                          {t.priority === 'high' ? 'عالية' : t.priority === 'medium' ? 'متوسطة' : 'منخفضة'}
                        </span>
                      </td>

                      {/* Interactive Task Status Selector */}
                      <td className="py-4 px-5">
                        <select
                          value={t.status === 'in-progress' ? 'doing' : t.status}
                          onChange={(e) => onStatusChange(taskId, e.target.value as Task['status'])}
                          className="bg-white border border-slate-300 rounded px-2.5 py-1 text-[11px] font-bold text-slate-800 focus:border-blue-600 focus:outline-none cursor-pointer"
                        >
                          <option value="todo">قيد الانتظار</option>
                          <option value="doing">قيد العمل</option>
                          <option value="review">مراجعة</option>
                          <option value="done">مكتملة</option>
                        </select>
                      </td>

                      <td className="py-4 px-5 text-slate-500 font-medium">
                        {t.dueDate || 'غير محدد'}
                      </td>

                      <td className="py-4 px-5 text-center">
                        <button
                          onClick={() => onDeleteTask(taskId)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="حذف المهمة"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
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
          <span className="font-semibold text-slate-800">{totalItems}</span> مهمة
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
