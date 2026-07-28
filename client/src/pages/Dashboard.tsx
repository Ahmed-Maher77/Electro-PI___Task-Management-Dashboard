import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  Rocket,
  ClipboardList,
  ChevronLeft,
  Link as LinkIcon,
  CheckCircle2,
  Clock,
  FolderKanban,
  Users,
} from 'lucide-react';
import type { RootState } from '../store';
import { getProjectsApi } from '../api/projects.api';
import { getAllTasksApi } from '../api/tasks.api';
import { getAllUsersApi } from '../api/auth.api';
import type { Project, Task } from '../types';
import { Spinner } from '../components/Loader';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const userName = user?.name ? user.name.split(' ')[0] : 'المستخدم';

  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [teamCount, setTeamCount] = useState<number>(4);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch real data from MongoDB API
  useEffect(() => {
    setIsLoading(true);
    Promise.all([getProjectsApi(), getAllTasksApi(), getAllUsersApi()])
      .then(([projRes, taskRes, usersRes]) => {
        setProjects(projRes.data || []);
        setTasks(taskRes.data || []);
        if (usersRes.data && usersRes.data.length > 0) {
          setTeamCount(usersRes.data.length);
        }
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  // Compute dynamic recent activity from real database items
  const activities = [
    ...projects.map((p) => ({
      id: `proj-${p._id || p.id}`,
      title: `مشروع: ${p.title}`,
      subtitle: `الحالة: ${p.status === 'in-progress' ? 'قيد التنفيذ' : p.status === 'completed' ? 'مكتمل' : 'معلق'} • التقدم: ${p.progress || 0}%`,
      date: p.dueDate || 'مؤخراً',
      icon: FolderKanban,
      color: 'bg-blue-50 text-blue-600',
    })),
    ...tasks.map((t) => ({
      id: `task-${t._id || t.id}`,
      title: `مهمة: ${t.title}`,
      subtitle: `المسند إليه: ${t.assigneeName || 'غير مسند'} • الحالة: ${t.status === 'doing' ? 'قيد العمل' : t.status === 'done' ? 'مكتملة' : 'قيد الانتظار'}`,
      date: t.dueDate || 'مؤخراً',
      icon: t.status === 'done' ? CheckCircle2 : Clock,
      color: t.status === 'done' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600',
    })),
  ].slice(0, 5);

  // Filter tasks assigned or high priority
  const myTasks = tasks.slice(0, 4);
  const pendingTasksCount = tasks.filter((t) => t.status !== 'done').length;
  const completedTasksCount = tasks.filter((t) => t.status === 'done').length;
  const highPriorityCount = tasks.filter((t) => t.priority === 'high').length;
  const completionRate = tasks.length > 0 ? Math.round((completedTasksCount / tasks.length) * 100) : 0;

  return (
    <div className="space-y-6 max-w-7xl mx-auto text-right">
      
      {/* Welcome Greeting */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-900">
          مرحباً بعودتك، {userName}.
        </h1>
        <p className="text-xs text-slate-600 font-medium">
          لديك <span className="font-bold text-blue-600">{pendingTasksCount} مهام معلقة</span> تتطلب انتباهك اليوم.
        </p>
      </div>

      {/* Row 1: Top Summary Stat Cards Grid (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Total Projects */}
        <div className="bg-white border border-slate-200 rounded-md p-5 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium text-slate-500">إجمالي المشاريع</p>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900">
              {isLoading ? <Spinner size="sm" /> : projects.length}
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
        <div className="bg-white border border-slate-200 rounded-md p-5 flex items-center justify-between">
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
        <div className="bg-white border border-slate-200 rounded-md p-5 flex items-center justify-between">
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
        <div className="bg-white border border-slate-200 rounded-md p-5 flex items-center justify-between">
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

      {/* Row 2: Main Grid (Real Activity & Projects Log) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Real Activity & Projects Log Card */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-md p-5 flex flex-col space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900">النشاط الأخير وسجل المشاريع</h2>
            <Link to="/projects" className="text-xs font-semibold text-blue-600 hover:underline">
              عرض جميع المشاريع ({projects.length})
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
                    onClick={() => navigate('/projects')}
                    className="py-3 flex items-center justify-between hover:bg-slate-50 px-2 rounded-md transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded flex items-center justify-center ${act.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-800">{act.title}</p>
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

        {/* Real Tasks List Card */}
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
            ) : myTasks.length === 0 ? (
              <div className="p-6 text-center text-slate-400 text-xs">
                لا توجد مهام مسجلة.
              </div>
            ) : (
              myTasks.map((t) => {
                const taskId = t._id || t.id || '';
                return (
                  <div key={taskId} className="border border-slate-200 rounded-md p-3.5 space-y-2 bg-slate-50/50">
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

      </div>

    </div>
  );
};

export default Dashboard;
