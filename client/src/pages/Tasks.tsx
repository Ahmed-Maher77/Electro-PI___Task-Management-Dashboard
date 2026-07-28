import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, Trash2, CheckSquare, ChevronRight, ChevronLeft } from 'lucide-react';
import { getAllTasksApi, deleteTaskApi } from '../api/tasks.api';
import type { Task } from '../types';
import { Spinner } from '../components/Loader';

export const Tasks: React.FC = () => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  // Real Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const loadTasks = () => {
    setIsLoading(true);
    getAllTasksApi()
      .then((res) => {
        setTasks(res.data || []);
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleDeleteTask = async (id: string) => {
    if (confirm('هل أنت تأكد من رغبتك في حذف هذه المهمة؟')) {
      try {
        await deleteTaskApi(id);
        setTasks(tasks.filter((t) => (t._id || t.id) !== id));
      } catch (err: any) {
        alert(err.message || 'فشل حذف المهمة');
      }
    }
  };

  const filteredTasks = tasks.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.taskIdCode && t.taskIdCode.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || t.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Dynamic Pagination Slices
  const totalItems = filteredTasks.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedTasks = filteredTasks.slice(startIndex, endIndex);

  return (
    <div className="space-y-6 max-w-7xl mx-auto text-right select-none">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-slate-900">جميع المهام</h1>
          <p className="text-xs text-slate-500 font-medium">
            متابعة وتصفية كافة المهام عبر جميع المشاريع في مكان واحد.
          </p>
        </div>

        <button
          onClick={() => navigate('/tasks/new')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-md transition-colors text-xs flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>إنشاء مهمة</span>
        </button>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="بحث باسم المهمة أو المعرف..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-white border border-slate-300 rounded-md pr-9 pl-4 py-2 text-slate-800 focus:border-blue-600 focus:outline-none"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 self-start sm:self-auto w-full sm:w-auto">
          
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-500 font-medium">الحالة:</span>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-white border border-slate-300 rounded-md px-3 py-2 text-slate-800 focus:border-blue-600 focus:outline-none"
            >
              <option value="all">جميع الحالات</option>
              <option value="todo">قيد الانتظار</option>
              <option value="doing">قيد العمل</option>
              <option value="review">مراجعة</option>
              <option value="done">مكتملة</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">الأولوية:</span>
            <select
              value={priorityFilter}
              onChange={(e) => {
                setPriorityFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-white border border-slate-300 rounded-md px-3 py-2 text-slate-800 focus:border-blue-600 focus:outline-none"
            >
              <option value="all">جميع الأولويات</option>
              <option value="low">منخفضة</option>
              <option value="medium">متوسطة</option>
              <option value="high">عالية</option>
            </select>
          </div>

        </div>

      </div>

      {/* Tasks Table Card */}
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
                  <th className="py-3.5 px-5">الحالة</th>
                  <th className="py-3.5 px-5">تاريخ الاستحقاق</th>
                  <th className="py-3.5 px-5 text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedTasks.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400 space-y-2">
                      <CheckSquare className="w-8 h-8 mx-auto text-slate-300" />
                      <p>لا توجد مهام مطابقة للبحث.</p>
                    </td>
                  </tr>
                ) : (
                  paginatedTasks.map((t) => {
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

                        <td className="py-4 px-5">
                          <span
                            className={`inline-block px-2.5 py-1 rounded text-[11px] font-bold ${
                              t.status === 'doing'
                                ? 'text-blue-600'
                                : t.status === 'review'
                                ? 'text-amber-700'
                                : t.status === 'done'
                                ? 'text-emerald-700'
                                : 'text-slate-600'
                            }`}
                          >
                            {t.status === 'doing'
                              ? 'قيد العمل'
                              : t.status === 'review'
                              ? 'مراجعة'
                              : t.status === 'done'
                              ? 'مكتملة'
                              : 'قيد الانتظار'}
                          </span>
                        </td>

                        <td className="py-4 px-5 text-slate-500 font-medium">
                          {t.dueDate || 'غير محدد'}
                        </td>

                        <td className="py-4 px-5 text-center">
                          <button
                            onClick={() => handleDeleteTask(taskId)}
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
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="w-7 h-7 flex items-center justify-center border border-slate-200 bg-white rounded text-slate-600 hover:bg-slate-100 disabled:opacity-40"
              title="الصفحة السابقة"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
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
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="w-7 h-7 flex items-center justify-center border border-slate-200 bg-white rounded text-slate-600 hover:bg-slate-100 disabled:opacity-40"
              title="الصفحة التالية"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Tasks;
