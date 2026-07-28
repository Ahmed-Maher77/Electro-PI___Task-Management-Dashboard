import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getProjectByIdApi, updateProjectApi } from '../api/projects.api';
import { getTasksByProjectApi, createTaskApi, deleteTaskApi, updateTaskApi } from '../api/tasks.api';
import type { Project, Task } from '../types';
import type { RootState } from '../store';
import { ProjectDetailsHeader } from '../components/projects/ProjectDetailsHeader';
import { ProjectOverviewCards } from '../components/projects/ProjectOverviewCards';
import { ProjectTasksSection } from '../components/projects/ProjectTasksSection';
import { Trash2 } from 'lucide-react';

export const ProjectDetails: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const currentUser = useSelector((state: RootState) => state.auth.user);

  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Contributor Team State
  const [contributors, setContributors] = useState<Array<{ name: string; role: string }>>([
    { name: 'سارة محمود', role: 'قائد الفريق' },
    { name: 'أحمد ماهر', role: 'مطور تطبيقات' },
    { name: 'محمد علي', role: 'مصمم واجهات' },
  ]);

  // Modal State for New Task
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newTaskAssignee, setNewTaskAssignee] = useState('سارة محمود');
  const [newTaskStatus, setNewTaskStatus] = useState<'todo' | 'doing' | 'review' | 'done'>('doing');
  const [newTaskPriority, setNewTaskPriority] = useState<'low' | 'medium' | 'high'>('high');
  const [isSubmittingTask, setIsSubmittingTask] = useState(false);

  // Modal State for Edit Project
  const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editSubtitle, setEditSubtitle] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editStatus, setEditStatus] = useState<'in-progress' | 'critical' | 'on-hold' | 'completed'>('in-progress');
  const [editProgress, setEditProgress] = useState<number>(50);
  const [isSavingProject, setIsSavingProject] = useState(false);

  // Modal State for Add Member & Manage Members
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [isManageMembersModalOpen, setIsManageMembersModalOpen] = useState(false);
  const [memberLeadName, setMemberLeadName] = useState('');
  const [memberRole, setMemberRole] = useState('مطور برمجيات');

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
      if (projRes.data) {
        setEditTitle(projRes.data.title || '');
        setEditSubtitle(projRes.data.subtitle || '');
        setEditDesc(projRes.data.description || '');
        setEditStatus(projRes.data.status || 'in-progress');
        setEditProgress(projRes.data.progress || 50);
      }
    } catch (err: any) {
      setError(err.message || 'فشل تحميل بيانات المشروع');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [projectId]);

  // Handle task status change
  const handleTaskStatusChange = async (taskId: string, newStatus: Task['status']) => {
    try {
      await updateTaskApi(taskId, { status: newStatus });
      setTasks(tasks.map((t) => ((t._id || t.id) === taskId ? { ...t, status: newStatus } : t)));
    } catch (err: any) {
      alert(err.message || 'فشل تحديث حالة المهمة');
    }
  };

  // Handle Edit Project Permission check
  const handleEditProjectClick = () => {
    const isOwner = project?.ownerId && currentUser?.id && project.ownerId === currentUser.id;
    const isAdmin = currentUser?.role === 'admin';

    if (project?.ownerId && !isOwner && !isAdmin) {
      alert('فقط منشئ المشروع يملك صلاحية تعديل أو حذف هذا المشروع.');
      return;
    }
    setIsEditProjectModalOpen(true);
  };

  // Save edited project changes to MongoDB
  const handleSaveProjectEdits = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectId || !editTitle) return;

    try {
      setIsSavingProject(true);
      const res = await updateProjectApi(projectId, {
        title: editTitle,
        subtitle: editSubtitle,
        description: editDesc,
        status: editStatus,
        progress: editProgress,
      });

      setProject(res.data);
      setIsEditProjectModalOpen(false);
    } catch (err: any) {
      alert(err.message || 'فشل حفظ تعديلات المشروع');
    } finally {
      setIsSavingProject(false);
    }
  };

  // Save new team member contributor
  const handleAddContributor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectId || !memberLeadName) return;

    try {
      const newMember = { name: memberLeadName, role: memberRole };
      setContributors([...contributors, newMember]);
      await updateProjectApi(projectId, { leadName: memberLeadName });
      setIsAddMemberModalOpen(false);
      setMemberLeadName('');
    } catch (err: any) {
      alert(err.message || 'فشل إضافة المساهم');
    }
  };

  // Remove a contributor from project
  const handleRemoveContributor = (nameToRemove: string) => {
    if (confirm(`هل أنت تأكد من إزالة (${nameToRemove}) من فريق عمل المشروع؟`)) {
      setContributors(contributors.filter((c) => c.name !== nameToRemove));
    }
  };

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
    } catch (err: any) {
      alert(err.message || 'فشل حذف المهمة');
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

      {/* Header */}
      <ProjectDetailsHeader project={project} onEditProject={handleEditProjectClick} />

      {/* Description & Team Cards */}
      <ProjectOverviewCards
        project={project}
        onAddMemberClick={() => setIsAddMemberModalOpen(true)}
        onManageMembersClick={() => setIsManageMembersModalOpen(true)}
      />

      {/* Active Tasks Section */}
      <ProjectTasksSection
        tasks={tasks}
        onTaskStatusChange={handleTaskStatusChange}
        onDeleteTask={handleDeleteTask}
        onCreateTask={handleCreateTask}
        isTaskModalOpen={isTaskModalOpen}
        setIsTaskModalOpen={setIsTaskModalOpen}
        newTaskTitle={newTaskTitle}
        setNewTaskTitle={setNewTaskTitle}
        newTaskDesc={newTaskDesc}
        setNewTaskDesc={setNewTaskDesc}
        newTaskAssignee={newTaskAssignee}
        setNewTaskAssignee={setNewTaskAssignee}
        newTaskStatus={newTaskStatus}
        setNewTaskStatus={setNewTaskStatus}
        newTaskPriority={newTaskPriority}
        setNewTaskPriority={setNewTaskPriority}
        isSubmittingTask={isSubmittingTask}
      />

      {/* Modal: Edit Project */}
      {isEditProjectModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-slate-200 rounded-md p-6 w-full max-w-md space-y-4">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              تعديل تفاصيل المشروع
            </h2>

            <form onSubmit={handleSaveProjectEdits} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="block font-semibold text-slate-700">عنوان المشروع</label>
                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full border border-slate-300 rounded-md p-2 focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-semibold text-slate-700">العنوان الفرعي</label>
                <input
                  type="text"
                  value={editSubtitle}
                  onChange={(e) => setEditSubtitle(e.target.value)}
                  className="w-full border border-slate-300 rounded-md p-2 focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-semibold text-slate-700">وصف المشروع</label>
                <textarea
                  rows={3}
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  className="w-full border border-slate-300 rounded-md p-2 focus:border-blue-600 focus:outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block font-semibold text-slate-700">الحالة</label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as any)}
                    className="w-full border border-slate-300 rounded-md p-2 focus:border-blue-600 focus:outline-none"
                  >
                    <option value="in-progress">قيد التنفيذ</option>
                    <option value="critical">حرج</option>
                    <option value="on-hold">معلق</option>
                    <option value="completed">مكتمل</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block font-semibold text-slate-700">نسبة الإنجاز (%)</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={editProgress}
                    onChange={(e) => setEditProgress(parseInt(e.target.value, 10) || 0)}
                    className="w-full border border-slate-300 rounded-md p-2 focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditProjectModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-md text-slate-600 hover:bg-slate-50 font-medium"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={isSavingProject}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium"
                >
                  {isSavingProject ? 'جاري الحفظ...' : 'حفظ التغيرات'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Manage Contributors */}
      {isManageMembersModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-slate-200 rounded-md p-6 w-full max-w-md space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">إدارة مساهمي مشروع ({project?.title})</h2>
              <button onClick={() => setIsManageMembersModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold">
                ✕
              </button>
            </div>

            <div className="divide-y divide-slate-100 space-y-2">
              {contributors.map((c) => (
                <div key={c.name} className="py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs">
                      {c.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">{c.name}</p>
                      <p className="text-[11px] text-slate-400">{c.role}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRemoveContributor(c.name)}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="إزالة المساهم"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <button
                onClick={() => {
                  setIsManageMembersModalOpen(false);
                  setIsAddMemberModalOpen(true);
                }}
                className="text-blue-600 hover:underline font-bold text-xs"
              >
                + إضافة مساهم جديد
              </button>
              <button
                onClick={() => setIsManageMembersModalOpen(false)}
                className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-medium"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add Contributor */}
      {isAddMemberModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-slate-200 rounded-md p-6 w-full max-w-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              إضافة مساهم للمشروع
            </h2>

            <form onSubmit={handleAddContributor} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="block font-semibold text-slate-700">اسم العضو / المساهم</label>
                <input
                  type="text"
                  required
                  value={memberLeadName}
                  onChange={(e) => setMemberLeadName(e.target.value)}
                  className="w-full border border-slate-300 rounded-md p-2 focus:border-blue-600 focus:outline-none"
                  placeholder="مثال: يوسف أحمد"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-semibold text-slate-700">الدور الوظيفي</label>
                <input
                  type="text"
                  value={memberRole}
                  onChange={(e) => setMemberRole(e.target.value)}
                  className="w-full border border-slate-300 rounded-md p-2 focus:border-blue-600 focus:outline-none"
                  placeholder="مثال: مطور واجهات خلفية"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddMemberModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-md text-slate-600 hover:bg-slate-50 font-medium"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium"
                >
                  إضافة
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
