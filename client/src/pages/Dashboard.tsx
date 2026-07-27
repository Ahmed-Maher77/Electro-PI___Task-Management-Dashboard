import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Rocket,
  ClipboardList,
  GitMerge,
  Bug,
  Server,
  UserPlus,
  ChevronLeft,
  Link as LinkIcon,
} from 'lucide-react';
import type { RootState } from '../store';

export const Dashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const userName = user?.name ? user.name.split(' ')[0] : 'أحمد';

  // Recent Activity mock data
  const recentActivities = [
    {
      id: 1,
      icon: GitMerge,
      iconBg: 'bg-slate-100 text-slate-700',
      title: 'دمج طلب السحب #4521 في الفرع الرئيسي main',
      meta: 'منذ ساعتين بواسطة سارة أحمد',
    },
    {
      id: 2,
      icon: Bug,
      iconBg: 'bg-amber-50 text-amber-600',
      title: 'تم الإبلاغ عن خطأ عالي الأهمية في بيئة الإنتاج Production',
      meta: 'منذ 4 ساعات بواسطة روبوت المراقبة',
    },
    {
      id: 3,
      icon: Server,
      iconBg: 'bg-slate-100 text-slate-700',
      title: 'توسيع نطاق خوادم التجميع US-East-1 cluster pods',
      meta: 'منذ 6 ساعات بواسطة النظام',
    },
    {
      id: 4,
      icon: UserPlus,
      iconBg: 'bg-slate-100 text-slate-700',
      title: 'إضافة مايكل روس إلى فريق DevOps',
      meta: 'منذ يوم واحد بواسطة المدير',
    },
  ];

  // My Tasks mock data
  const myTasks = [
    {
      id: 'PR-1298',
      priority: 'عالية',
      priorityColor: 'bg-red-50 text-red-600 border-red-200',
      dueDate: 'مستحقة اليوم',
      title: 'مراجعة تحديثات الأمان لمكتبات Node.js (node-api)',
    },
    {
      id: 'TASK-88',
      priority: 'متوسطة',
      priorityColor: 'bg-blue-50 text-blue-600 border-blue-200',
      dueDate: 'خلال يومين',
      title: 'تحسين استعلامات قاعدة البيانات للوحة التحكم',
    },
    {
      id: 'DOCS-02',
      priority: 'منخفضة',
      priorityColor: 'bg-slate-100 text-slate-600 border-slate-200',
      dueDate: 'الأسبوع القادم',
      title: 'تحديث وثائق التكامل للتحسين المستمر CI/CD',
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto text-right">
      
      {/* Welcome Greeting */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-900">
          مرحباً بعودتك، {userName}.
        </h1>
        <p className="text-xs text-slate-600 font-medium">
          لديك <span className="font-bold text-blue-600">12 مهمة</span> تتطلب انتباهك اليوم.
        </p>
      </div>

      {/* Row 1: Top Summary Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Active Projects Card */}
        <div className="bg-white border border-slate-200 rounded-md p-5 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium text-slate-500">المشاريع النشطة</p>
            <p className="text-3xl font-bold text-slate-900">24</p>
            <p className="text-[11px] font-semibold text-blue-600 pt-1">
              +3 مقارنة بالشهر الماضي
            </p>
          </div>
          <div className="w-10 h-10 rounded bg-blue-50 text-blue-600 flex items-center justify-center">
            <Rocket className="w-5 h-5" />
          </div>
        </div>

        {/* Pending Tasks Card */}
        <div className="bg-white border border-slate-200 rounded-md p-5 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium text-slate-500">المهام المعلقة</p>
            <p className="text-3xl font-bold text-slate-900">158</p>
            <p className="text-[11px] font-semibold text-red-600 pt-1">
              12 متأخرة اليوم
            </p>
          </div>
          <div className="w-10 h-10 rounded bg-orange-50 text-orange-600 flex items-center justify-center">
            <ClipboardList className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* Row 2: Main Grid (Recent Activity & My Tasks) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Recent Activity Card */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-md p-5 flex flex-col space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900">النشاط الأخير</h2>
            <Link to="/projects" className="text-xs font-semibold text-blue-600 hover:underline">
              عرض الكل
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {recentActivities.map((act) => {
              const Icon = act.icon;
              return (
                <div key={act.id} className="py-3 flex items-center justify-between hover:bg-slate-50 px-2 rounded-md transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${act.iconBg}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-800">{act.title}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{act.meta}</p>
                    </div>
                  </div>
                  <ChevronLeft className="w-4 h-4 text-slate-400" />
                </div>
              );
            })}
          </div>
        </div>

        {/* My Tasks Card */}
        <div className="bg-white border border-slate-200 rounded-md p-5 flex flex-col justify-between space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900">مهامي</h2>
          </div>

          <div className="space-y-3 flex-1">
            {myTasks.map((task) => (
              <div key={task.id} className="border border-slate-200 rounded-md p-3.5 space-y-2 bg-slate-50/50">
                <div className="flex items-center justify-between text-[11px]">
                  <span className={`px-2 py-0.5 rounded font-bold border ${task.priorityColor}`}>
                    {task.priority}
                  </span>
                  <span className="text-slate-500 font-medium">{task.dueDate}</span>
                </div>
                <p className="text-xs font-semibold text-slate-800 leading-snug">{task.title}</p>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
                  <LinkIcon className="w-3 h-3" />
                  <span>{task.id}</span>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-medium py-2 rounded-md transition-colors text-xs">
            عرض قائمة المهام الكاملة
          </button>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;
