import React, { useState } from 'react';
import { Plus, Filter, SlidersHorizontal, MoreVertical, ChevronRight, ChevronLeft, User as UserIcon, X } from 'lucide-react';
import type { Task } from '../../types';

interface ProjectTasksSectionProps {
  tasks: Task[];
  onTaskStatusChange: (taskId: string, status: Task['status']) => void;
  onDeleteTask: (taskId: string) => void;
  onCreateTask: (e: React.FormEvent) => void;
  isTaskModalOpen: boolean;
  setIsTaskModalOpen: (open: boolean) => void;
  newTaskTitle: string;
  setNewTaskTitle: (val: string) => void;
  newTaskDesc: string;
  setNewTaskDesc: (val: string) => void;
  newTaskAssignee: string;
  setNewTaskAssignee: (val: string) => void;
  newTaskStatus: 'todo' | 'doing' | 'review' | 'done';
  setNewTaskStatus: (val: 'todo' | 'doing' | 'review' | 'done') => void;
  newTaskPriority: 'low' | 'medium' | 'high';
  setNewTaskPriority: (val: 'low' | 'medium' | 'high') => void;
  isSubmittingTask: boolean;
}

export const ProjectTasksSection: React.FC<ProjectTasksSectionProps> = ({
  tasks,
  onTaskStatusChange,
  onDeleteTask,
  onCreateTask,
  isTaskModalOpen,
  setIsTaskModalOpen,
  newTaskTitle,
  setNewTaskTitle,
  newTaskDesc,
  setNewTaskDesc,
  newTaskAssignee,
  setNewTaskAssignee,
  newTaskStatus,
  setNewTaskStatus,
  newTaskPriority,
  setNewTaskPriority,
  isSubmittingTask,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'my-work' | 'completed'>('all');
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Advanced Filter & Sort State
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [sortOrder, setSortOrder] = useState<'default' | 'priority'>('default');

  // Filter tasks based on tab & priority & sort
  const filteredTasks = tasks
    .filter((t) => {
      if (activeTab === 'completed') return t.status === 'done';
      if (activeTab === 'my-work') return t.assigneeName?.includes('أحمد') || t.assigneeName?.includes('سارة');
      return true;
    })
    .filter((t) => {
      if (priorityFilter === 'all') return true;
      return t.priority === priorityFilter;
    })
    .sort((a, b) => {
      if (sortOrder === 'priority') {
        const pMap = { high: 3, medium: 2, low: 1 };
        return (pMap[b.priority || 'low'] || 0) - (pMap[a.priority || 'low'] || 0);
      }
      return 0;
    });

  return (
    <div className="space-y-4">
      {/* Section Header & Tabs Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-2">
        <div className="flex items-center gap-6">
          <h2 className="text-base font-bold text-slate-900">المهام النشطة</h2>
          
          <div className="flex items-center gap-4 text-xs font-medium">
            <button
              onClick={() => setActiveTab('all')}
              className={`pb-2 transition-colors relative ${
                activeTab === 'all' ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              جميع المهام
              {activeTab === 'all' && <span className="absolute bottom-0 right-0 left-0 h-0.5 bg-blue-600" />}
            </button>

            <button
              onClick={() => setActiveTab('my-work')}
              className={`pb-2 transition-colors relative ${
                activeTab === 'my-work' ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              مهامي
              {activeTab === 'my-work' && <span className="absolute bottom-0 right-0 left-0 h-0.5 bg-blue-600" />}
            </button>

            <button
              onClick={() => setActiveTab('completed')}
              className={`pb-2 transition-colors relative ${
                activeTab === 'completed' ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              المكتملة
              {activeTab === 'completed' && <span className="absolute bottom-0 right-0 left-0 h-0.5 bg-blue-600" />}
            </button>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 relative">
          
          {/* Interactive Filter Trigger */}
          <button
            onClick={() => setShowFilterMenu(!showFilterMenu)}
            className={`p-2 border rounded-md transition-colors ${
              showFilterMenu || priorityFilter !== 'all' || sortOrder !== 'default'
                ? 'border-blue-600 bg-blue-50 text-blue-600 font-bold'
                : 'border-slate-300 bg-white text-slate-500 hover:text-slate-800'
            }`}
            title="تصفية المهام"
          >
            <Filter className="w-3.5 h-3.5" />
          </button>

          {/* Interactive Sort Order Trigger */}
          <button
            onClick={() => setSortOrder(sortOrder === 'default' ? 'priority' : 'default')}
            className={`p-2 border rounded-md transition-colors ${
              sortOrder === 'priority'
                ? 'border-purple-600 bg-purple-50 text-purple-600 font-bold'
                : 'border-slate-300 bg-white text-slate-500 hover:text-slate-800'
            }`}
            title="ترتيب المهام حسب الأولوية"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>

          {/* Create Task Button */}
          <button
            onClick={() => setIsTaskModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-3.5 rounded-md transition-colors text-xs flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>إنشاء مهمة</span>
          </button>

          {/* Interactive Filter Popover */}
          {showFilterMenu && (
            <div className="absolute left-0 top-10 w-56 bg-white border border-slate-200 rounded-md p-4 shadow-lg z-30 space-y-3 text-xs text-right">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="font-bold text-slate-800">تصفية المهام</span>
                <button onClick={() => setShowFilterMenu(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-1">
                <label className="block text-slate-600 font-medium">الأولوية</label>
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-300 rounded p-1.5 text-slate-800 focus:border-blue-600"
                >
                  <option value="all">جميع الأولويات</option>
                  <option value="high">عالية فقط</option>
                  <option value="medium">متوسطة فقط</option>
                  <option value="low">منخفضة فقط</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-slate-600 font-medium">الترتيب</label>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-300 rounded p-1.5 text-slate-800 focus:border-blue-600"
                >
                  <option value="default">التلقائي</option>
                  <option value="priority">حسب الأهمية (الأعلى أولاً)</option>
                </select>
              </div>

              {(priorityFilter !== 'all' || sortOrder !== 'default') && (
                <button
                  onClick={() => {
                    setPriorityFilter('all');
                    setSortOrder('default');
                  }}
                  className="w-full py-1 text-center text-blue-600 hover:underline text-[11px] font-semibold pt-1"
                >
                  إعادة ضبط الفلاتر
                </button>
              )}
            </div>
          )}

        </div>
      </div>

      {/* Tasks Table */}
      <div className="bg-white border border-slate-200 rounded-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px] font-bold">
                <th className="py-3.5 px-5">المعرف</th>
                <th className="py-3.5 px-5">عنوان المهمة</th>
                <th className="py-3.5 px-5">المسند إليه</th>
                <th className="py-3.5 px-5">تغيير الحالة</th>
                <th className="py-3.5 px-5">تاريخ الاستحقاق</th>
                <th className="py-3.5 px-5 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTasks.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    لا توجد مهام حالياً مطابقة للفلاتر المحددة.
                  </td>
                </tr>
              ) : (
                filteredTasks.map((t) => {
                  const taskId = t._id || t.id || '';

                  return (
                    <tr key={taskId} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-5 font-mono text-slate-400 font-semibold text-[11px]">
                        {t.taskIdCode || 'لا يوجد كود لهذه المهمة'}
                      </td>

                      <td className="py-4 px-5">
                        <p className="font-bold text-slate-900 text-sm leading-snug">{t.title}</p>
                        <p className="text-slate-400 text-[11px] mt-0.5">{t.description || 'لا يوجد وصف لهذه المهمة'}</p>
                      </td>

                      <td className="py-4 px-5">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-[9px]">
                            {t.assigneeName ? t.assigneeName.charAt(0) : <UserIcon className="w-3 h-3" />}
                          </div>
                          <span className="font-medium text-slate-700">{t.assigneeName || 'غير مسند'}</span>
                        </div>
                      </td>

                      {/* Interactive Task Status Selector */}
                      <td className="py-4 px-5">
                        <select
                          value={t.status === 'in-progress' ? 'doing' : t.status}
                          onChange={(e) => onTaskStatusChange(taskId, e.target.value as Task['status'])}
                          className="bg-white border border-slate-300 rounded px-2.5 py-1 text-[11px] font-bold text-slate-800 focus:border-blue-600 focus:outline-none cursor-pointer"
                        >
                          <option value="todo">قيد الانتظار</option>
                          <option value="doing">قيد العمل</option>
                          <option value="review">مراجعة</option>
                          <option value="done">مكتملة</option>
                        </select>
                      </td>

                      <td className="py-4 px-5 font-medium text-slate-600 whitespace-nowrap">
                        {t.dueDate || 'لا يوجد تاريخ استحقاق'}
                      </td>

                      <td className="py-4 px-5 text-center relative">
                        <button
                          onClick={() => setActiveMenuId(activeMenuId === taskId ? null : taskId)}
                          className="p-1 text-slate-400 hover:text-slate-700 rounded transition-colors"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>

                        {activeMenuId === taskId && (
                          <div className="absolute left-4 top-10 w-32 bg-white border border-slate-200 rounded-md z-20 py-1 text-right text-xs shadow-md">
                            <button
                              onClick={() => {
                                setActiveMenuId(null);
                                onDeleteTask(taskId);
                              }}
                              className="w-full text-right px-3 py-1.5 hover:bg-red-50 text-red-600 font-medium"
                            >
                              حذف المهمة
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

        <div className="bg-slate-50/50 border-t border-slate-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>
            عرض <span className="font-semibold text-slate-800">{filteredTasks.length}</span> من أصل{' '}
            <span className="font-semibold text-slate-800">{tasks.length}</span> عنصر
          </p>

          <div className="flex items-center gap-1 font-medium">
            <button className="w-7 h-7 flex items-center justify-center border border-slate-200 bg-white rounded text-slate-600 hover:bg-slate-100">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button className="w-7 h-7 flex items-center justify-center bg-blue-600 text-white rounded font-bold">
              1
            </button>
            <button className="w-7 h-7 flex items-center justify-center border border-slate-200 bg-white rounded text-slate-600 hover:bg-slate-100">
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Create Task Modal */}
      {isTaskModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-slate-200 rounded-md p-6 w-full max-w-md space-y-4">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              إنشاء مهمة جديدة
            </h2>

            <form onSubmit={onCreateTask} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="block font-semibold text-slate-700">عنوان المهمة</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: إضافة بوابة الدفع الإلكتروني"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full border border-slate-300 rounded-md p-2 focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-semibold text-slate-700">وصف المهمة</label>
                <textarea
                  rows={2}
                  placeholder="تفاصيل وأهداف الإنجاز..."
                  value={newTaskDesc}
                  onChange={(e) => setNewTaskDesc(e.target.value)}
                  className="w-full border border-slate-300 rounded-md p-2 focus:border-blue-600 focus:outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block font-semibold text-slate-700">المسند إليه</label>
                  <input
                    type="text"
                    value={newTaskAssignee}
                    onChange={(e) => setNewTaskAssignee(e.target.value)}
                    className="w-full border border-slate-300 rounded-md p-2 focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-semibold text-slate-700">الحالة</label>
                  <select
                    value={newTaskStatus}
                    onChange={(e) => setNewTaskStatus(e.target.value as any)}
                    className="w-full border border-slate-300 rounded-md p-2 focus:border-blue-600 focus:outline-none"
                  >
                    <option value="doing">قيد العمل</option>
                    <option value="review">مراجعة</option>
                    <option value="todo">قيد الانتظار</option>
                    <option value="done">مكتملة</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-semibold text-slate-700">الأولوية</label>
                <select
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value as any)}
                  className="w-full border border-slate-300 rounded-md p-2 focus:border-blue-600 focus:outline-none"
                >
                  <option value="high">عالية</option>
                  <option value="medium">متوسطة</option>
                  <option value="low">منخفضة</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsTaskModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-md text-slate-600 hover:bg-slate-50 font-medium"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingTask}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium"
                >
                  {isSubmittingTask ? 'جاري الحفظ...' : 'حفظ المهمة'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
