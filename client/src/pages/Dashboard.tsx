import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FolderKanban, CheckCircle2, Clock } from 'lucide-react';
import type { RootState } from '../store';
import { getProjectsApi } from '../api/projects.api';
import { getAllTasksApi, updateTaskApi } from '../api/tasks.api';
import { getAllUsersApi } from '../api/auth.api';
import type { Project, Task, ActivityItem } from '../types';
import { StatCards } from '../components/dashboard/StatCards';
import { RecentActivity } from '../components/dashboard/RecentActivity';
import { RecentTasksList } from '../components/dashboard/RecentTasksList';

export const Dashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const userName = user?.name ? user.name.split(' ')[0] : 'المستخدم';

  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [teamCount, setTeamCount] = useState<number>(4);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch real data from MongoDB API
  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const [projRes, taskRes, usersRes] = await Promise.all([
        getProjectsApi(),
        getAllTasksApi(),
        getAllUsersApi(),
      ]);
      setProjects(projRes.data || []);
      setTasks(taskRes.data || []);
      if (usersRes.data && usersRes.data.length > 0) {
        setTeamCount(usersRes.data.length);
      }
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Handle direct task status change from dashboard
  const handleTaskStatusChange = async (taskId: string, newStatus: Task['status']) => {
    try {
      await updateTaskApi(taskId, { status: newStatus });
      setTasks(tasks.map((t) => ((t._id || t.id) === taskId ? { ...t, status: newStatus } : t)));
    } catch (err: any) {
      alert(err.message || 'فشل تحديث حالة المهمة');
    }
  };

  // Compute dynamic recent activity
  const activities: ActivityItem[] = [
    ...projects.map((p) => {
      const realId = p._id || p.id || '';
      return {
        id: `proj-${realId}`,
        rawId: realId,
        type: 'project' as const,
        title: `مشروع: ${p.title}`,
        subtitle: `الحالة: ${p.status === 'in-progress' ? 'قيد التنفيذ' : p.status === 'completed' ? 'مكتمل' : 'معلق'} • التقدم: ${p.progress || 0}%`,
        date: p.dueDate || 'مؤخراً',
        icon: FolderKanban,
        color: 'bg-blue-50 text-blue-600',
      };
    }),
    ...tasks.map((t) => {
      const realId = t._id || t.id || '';
      return {
        id: `task-${realId}`,
        rawId: realId,
        type: 'task' as const,
        title: `مهمة: ${t.title}`,
        subtitle: `المسند إليه: ${t.assigneeName || 'غير مسند'} • الحالة: ${t.status === 'doing' ? 'قيد العمل' : t.status === 'done' ? 'مكتملة' : 'قيد الانتظار'}`,
        date: t.dueDate || 'مؤخراً',
        icon: t.status === 'done' ? CheckCircle2 : Clock,
        color: t.status === 'done' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600',
      };
    }),
  ].slice(0, 5);

  const myTasks = tasks.slice(0, 4);
  const pendingTasksCount = tasks.filter((t) => t.status !== 'done').length;
  const completedTasksCount = tasks.filter((t) => t.status === 'done').length;
  const highPriorityCount = tasks.filter((t) => t.priority === 'high').length;
  const completionRate = tasks.length > 0 ? Math.round((completedTasksCount / tasks.length) * 100) : 0;

  return (
    <div className="space-y-6 max-w-7xl mx-auto text-right select-none">
      
      {/* Welcome Greeting */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-900">
          مرحباً بعودتك، {userName}.
        </h1>
        <p className="text-xs text-slate-600 font-medium">
          لديك <span className="font-bold text-blue-600">{pendingTasksCount} مهام معلقة</span> تتطلب انتباهك اليوم.
        </p>
      </div>

      {/* Row 1: Top Summary Stat Cards Grid */}
      <StatCards
        isLoading={isLoading}
        projectsCount={projects.length}
        pendingTasksCount={pendingTasksCount}
        highPriorityCount={highPriorityCount}
        completedTasksCount={completedTasksCount}
        completionRate={completionRate}
        teamCount={teamCount}
      />

      {/* Row 2: Recent Activity & Recent Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <RecentActivity
          isLoading={isLoading}
          projectsCount={projects.length}
          activities={activities}
        />
        <RecentTasksList
          isLoading={isLoading}
          tasks={myTasks}
          onTaskStatusChange={handleTaskStatusChange}
        />
      </div>

    </div>
  );
};

export default Dashboard;
