import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Info,
  UserPlus,
  Share2,
  Edit,
  Plus,
  Filter,
  SlidersHorizontal,
  MoreVertical,
  ChevronRight,
  ChevronLeft,
  User as UserIcon,
} from 'lucide-react';
import { getProjectByIdApi } from '../api/projects.api';
import { getTasksByProjectApi, createTaskApi, deleteTaskApi } from '../api/tasks.api';
import type { Project, Task } from '../types';

export const ProjectDetails: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();

  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Active Tab Filter
  const [activeTab, setActiveTab] = useState<'all' | 'my-work' | 'completed'>('all');
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Modal State for New Task
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newTaskAssignee, setNewTaskAssignee] = useState('سارة تشن');
  const [newTaskStatus, setNewTaskStatus] = useState<'todo' | 'doing' | 'review' | 'done'>('doing');
  const [newTaskPriority, setNewTaskPriority] = useState<'low' | 'medium' | 'high'>('high');
  const [isSubmittingTask, setIsSubmittingTask] = useState(false);

  // Load project & tasks data
  const fetchData = async () => {
    if (!projectId) return;
    try {
      setLoading(true);
      const [projRes, tasksRes] = await Promise.all([
        getProjectByIdApi(projectId),
        getTasksByProjectApi(projectId),
      ]);
      setProject(projRes.data);
      setTasks(tasksRes.data || []);
    } catch (err: any) {
      setError(err.message || 'فشل تحميل بيانات المشروع');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [projectId]);

  // Handle task creation
  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectId || !newTaskTitle) return;

    try {
      setIsSubmittingTask(true);
      const res = await createTaskApi(projectId, {
        title: newTaskTitle,
        description: newTaskDesc,
        assigneeName: newTaskAssignee,
        status: newTaskStatus,
        priority: newTaskPriority,
        dueDate: 'اليوم، 5:00 مساءً',
      });

      setTasks([res.data, ...tasks]);
      setIsTaskModalOpen(false);
      setNewTaskTitle('');
      setNewTaskDesc('');
    } catch (err: any) {
      alert(err.message || 'فشل إنشاء المهمة');
    } finally {
      setIsSubmittingTask(false);
    }
  };

  // Handle task deletion
  const handleDeleteTask = async (taskId: string) => {
    if (!confirm('هل أنت تأكد من حذف هذه المهمة؟')) return;
    try {
      await deleteTaskApi(taskId);
      setTasks(tasks.filter((t) => (t._id || t.id) !== taskId));
      setActiveMenuId(null);
    } catch (err: any) {
      alert(err.message || 'فشل حذف المهمة');
    }
  };

  // Filter tasks based on active tab
  const filteredTasks = tasks.filter((t) => {
    if (activeTab === 'completed') return t.status === 'done';
    if (activeTab === 'my-work') return t.assigneeName?.includes('سارة') || t.assigneeName?.includes('أليكس');
    return true;
  });

  // Get status badge styling for tasks
  const getTaskStatusBadge = (status: string) => {
    switch (status) {
      case 'doing':
      case 'in-progress':
        return { label: 'قيد العمل', className: 'bg-blue-50 text-blue-600 border-blue-200' };
      case 'review':
        return { label: 'مراجعة', className: 'bg-amber-50 text-amber-700 border-amber-200' };
      case 'done':
        return { label: 'مكتملة', className: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
      case 'todo':
      default:
        return { label: 'قيد الانتظار', className: 'bg-slate-100 text-slate-600 border-slate-200' };
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-xs font-medium text-slate-500">
        جاري تحميل تفاصيل المشروع والمهام...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto text-right select-none">
      
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md">
          {error}
        </div>
      )}

      {/* Breadcrumbs & Header Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Link to="/projects" className="hover:text-slate-800 transition-colors">
              المشاريع
            </Link>
            <span>/</span>
            <span className="text-slate-800 font-semibold">{project?.title || 'Cloud Migration v2'}</span>
          </div>

          <div className="flex items-center gap-3 pt-1">
            <h1 className="text-2xl font-bold text-slate-900 leading-tight">
              {project?.title || 'Cloud Migration v2'}
            </h1>
            <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-blue-50 text-blue-600 border border-blue-200">
              قيد التنفيذ
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-medium py-2 px-3.5 rounded-md transition-colors text-xs flex items-center gap-1.5">
            <Share2 className="w-3.5 h-3.5" />
            <span>مشاركة</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors text-xs flex items-center gap-1.5">
            <Edit className="w-3.5 h-3.5" />
            <span>تعديل المشروع</span>
          </button>
        </div>
      </div>

      {/* Row 1: Project Description & Team Members Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Description Card (Spans 2 cols) */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-md p-6 space-y-6 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">وصف المشروع</h2>
              <Info className="w-4 h-4 text-slate-400" />
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {project?.description ||
                'ترحيل شامل وقابل للتوسع للخدمات المصغرة القديمة إلى تجميعة Kubernetes الجديدة في منطقة US-East-1. تشمل هذه المبادرة تحويل 42 خدمة إلى حاويات، وإعداد مسارات التكامل والنشر المستمر التلقائية عبر GitHub Actions، وإنشاء لوحات مراقبة متكاملة باستخدام Prometheus و Grafana. تمنح الأولوية لبوابات الخدمة ذات الحركة العالية.'}
            </p>
          </div>

          {/* Meta Footer Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-100 pt-4 text-xs">
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">تاريخ البدء</p>
              <p className="font-bold text-slate-800 mt-1">12 أكتوبر 2023</p>
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">تاريخ الاستحقاق</p>
              <p className="font-bold text-slate-800 mt-1">28 يناير 2024</p>
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">الأولوية</p>
              <p className="font-bold text-red-600 mt-1">عالية</p>
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">مالك المشروع</p>
              <p className="font-bold text-blue-600 mt-1">أليكس ريفيرا</p>
            </div>
          </div>
        </div>

        {/* Team Members Card (Spans 1 col) */}
        <div className="bg-white border border-slate-200 rounded-md p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">أعضاء الفريق</h2>
              <a href="#manage" onClick={(e) => e.preventDefault()} className="text-xs font-semibold text-blue-600 hover:underline">
                إدارة
              </a>
            </div>

            {/* Member List */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs">
                  S
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">سارة تشن (Sarah Chen)</p>
                  <p className="text-[11px] text-slate-400">قائد DevOps</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs">
                  M
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">ماركوس ثورن (Marcus Thorne)</p>
                  <p className="text-[11px] text-slate-400">أخصائي موثوقية الخوادم SRE</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs">
                  D
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">ديفيد كيم (David Kim)</p>
                  <p className="text-[11px] text-slate-400">مصمم المنتجات</p>
                </div>
              </div>
            </div>
          </div>

          <button className="w-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-medium py-2 rounded-md transition-colors text-xs flex items-center justify-center gap-1.5">
            <UserPlus className="w-3.5 h-3.5" />
            <span>إضافة مساهم</span>
          </button>
        </div>

      </div>

      {/* Row 2: Active Tasks Section */}
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
          <div className="flex items-center gap-2">
            <button className="p-2 border border-slate-300 rounded-md bg-white text-slate-500 hover:text-slate-800 transition-colors">
              <Filter className="w-3.5 h-3.5" />
            </button>
            <button className="p-2 border border-slate-300 rounded-md bg-white text-slate-500 hover:text-slate-800 transition-colors">
              <SlidersHorizontal className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsTaskModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-3.5 rounded-md transition-colors text-xs flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>إنشاء مهمة</span>
            </button>
          </div>

        </div>

        {/* Tasks Data Table */}
        <div className="bg-white border border-slate-200 rounded-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px] font-bold">
                  <th className="py-3.5 px-5">المعرف</th>
                  <th className="py-3.5 px-5">وصف المهمة</th>
                  <th className="py-3.5 px-5">المسند إليه</th>
                  <th className="py-3.5 px-5">الحالة</th>
                  <th className="py-3.5 px-5">تاريخ الاستحقاق</th>
                  <th className="py-3.5 px-5 text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTasks.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400">
                      لا توجد مهام حالياً في هذه الفئة.
                    </td>
                  </tr>
                ) : (
                  filteredTasks.map((t) => {
                    const taskId = t._id || t.id || '';
                    const badge = getTaskStatusBadge(t.status);

                    return (
                      <tr key={taskId} className="hover:bg-slate-50/80 transition-colors">
                        
                        {/* ID Code */}
                        <td className="py-4 px-5 font-mono text-slate-400 font-semibold text-[11px]">
                          {t.taskIdCode || 'TASK-1001'}
                        </td>

                        {/* Title & Description */}
                        <td className="py-4 px-5">
                          <p className="font-bold text-slate-900 text-sm leading-snug">{t.title}</p>
                          <p className="text-slate-400 text-[11px] mt-0.5">{t.description || 'تفاصيل وخطوات الإنجاز'}</p>
                        </td>

                        {/* Assignee */}
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-[9px]">
                              {t.assigneeName ? t.assigneeName.charAt(0) : <UserIcon className="w-3 h-3" />}
                            </div>
                            <span className="font-medium text-slate-700">{t.assigneeName || 'غير مسند'}</span>
                          </div>
                        </td>

                        {/* Status Badge */}
                        <td className="py-4 px-5">
                          <span className={`inline-block px-2.5 py-1 rounded text-[11px] font-bold border ${badge.className}`}>
                            {badge.label}
                          </span>
                        </td>

                        {/* Due Date */}
                        <td className="py-4 px-5 font-medium text-slate-600 whitespace-nowrap">
                          {t.dueDate || 'اليوم، 5:00 مساءً'}
                        </td>

                        {/* Action Menu */}
                        <td className="py-4 px-5 text-center relative">
                          <button
                            onClick={() => setActiveMenuId(activeMenuId === taskId ? null : taskId)}
                            className="p-1 text-slate-400 hover:text-slate-700 rounded transition-colors"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>

                          {activeMenuId === taskId && (
                            <div className="absolute left-4 top-10 w-32 bg-white border border-slate-200 rounded-md z-20 py-1 text-right text-xs">
                              <button
                                onClick={() => handleDeleteTask(taskId)}
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

          {/* Footer Pagination */}
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
                2
              </button>
              <button className="w-7 h-7 flex items-center justify-center border border-slate-200 bg-white rounded text-slate-600 hover:bg-slate-100">
                3
              </button>
              <button className="w-7 h-7 flex items-center justify-center border border-slate-200 bg-white rounded text-slate-600 hover:bg-slate-100">
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Create Task Modal Dialog */}
      {isTaskModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-slate-200 rounded-md p-6 w-full max-w-md space-y-4">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              إنشاء مهمة جديدة
            </h2>

            <form onSubmit={handleCreateTask} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="block font-semibold text-slate-700">عنوان المهمة</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: Provision IAM roles for staging"
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

export default ProjectDetails;
