import React from 'react';
import { Activity, CheckCircle, Server, Database, ShieldCheck, Globe, Clock, AlertTriangle } from 'lucide-react';

export const Status: React.FC = () => {
  const services = [
    {
      name: 'خوادم الواجهة الأمامية (Frontend Application)',
      status: 'operational',
      uptime: '100%',
      latency: '18ms',
      icon: Globe,
    },
    {
      name: 'واجهة API والخلفية (Node.js & Express Server)',
      status: 'operational',
      uptime: '99.98%',
      latency: '35ms',
      icon: Server,
    },
    {
      name: 'قواعد البيانات (MongoDB & Mongoose Cluster)',
      status: 'operational',
      uptime: '100%',
      latency: '12ms',
      icon: Database,
    },
    {
      name: 'خدمة التنبيهات والـ Webhooks (Notifications Engine)',
      status: 'operational',
      uptime: '99.95%',
      latency: '45ms',
      icon: Activity,
    },
    {
      name: 'حماية الشبكة والجدار الناري (Security & Firewall)',
      status: 'operational',
      uptime: '100%',
      latency: '5ms',
      icon: ShieldCheck,
    },
  ];

  const pastIncidents = [
    {
      id: 1,
      date: '25 أكتوبر 2023 - 03:00 ص (توقيت القاهرة)',
      title: 'صيانة دورية لقواعد البيانات وترقية النسخ الاحتياطية',
      desc: 'تمت الصيانة المخططة بنجاح دون أي توقف في الخدمة.',
      status: 'resolved',
    },
    {
      id: 2,
      date: '18 أكتوبر 2023 - 11:30 م (توقيت القاهرة)',
      title: 'توسيع نطاق الخوادم وزيادة الطاقة الاستيعابية',
      desc: 'تمت إضافة عُقد جديدة في التجمع لاستيعاب زيادة حجم الطلبات.',
      status: 'resolved',
    },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto text-right select-none">
      
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-900">حالة النظام والخدمات الحية</h1>
        <p className="text-xs text-slate-500 font-medium">
          متابعة حالة التشغيل المباشرة لمكونات وخوادم منصة Electro-Pi.
        </p>
      </div>

      {/* Main Operational Banner Status */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-md p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold text-emerald-900 text-sm">جميع الأنظمة والخدمات تعمل بكفاءة عالية</h2>
            <p className="text-emerald-700 text-xs mt-0.5 font-medium">
              نسبة التوافر العامة: <span className="font-bold">99.99%</span> | متوسط ززمن الاستجابة: <span className="font-bold">28ms</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-white border border-emerald-200 px-3 py-1.5 rounded-md">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>تحديث حي مستمر</span>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        
        <div className="bg-white border border-slate-200 rounded-md p-5 space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span>متوسط زمن الاستجابة</span>
            <Clock className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900">28 ms</p>
          <p className="text-[11px] text-emerald-600 font-semibold">+4% أسرع من المتوسط</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-md p-5 space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span>نسبة التشغيل آخر 90 يوم</span>
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900">99.99 %</p>
          <p className="text-[11px] text-slate-400">تطابق معيار التوافر المؤسسي</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-md p-5 space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span>حوادث التوقف هذا الشهر</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-bold text-slate-900">0 حوادث</p>
          <p className="text-[11px] text-emerald-600 font-semibold">استقرار كامل 100%</p>
        </div>

      </div>

      {/* Services List Table */}
      <div className="bg-white border border-slate-200 rounded-md overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3.5 flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            حالة مكونات النظام (SYSTEM SERVICES STATUS)
          </h3>
          <span className="text-[11px] text-slate-400 font-medium">5 مكونات مفعلة</span>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {services.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="p-4 sm:px-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-slate-100 text-slate-700 flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-xs">{s.name}</p>
                    <p className="text-slate-400 text-[11px]">زمن الاستجابة: {s.latency}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-slate-500 text-[11px] font-medium hidden sm:inline">
                    نسبة التشغيل: {s.uptime}
                  </span>
                  <span className="px-2.5 py-1 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    <span>شغالة (Operational)</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Incidents Logs */}
      <div className="bg-white border border-slate-200 rounded-md p-6 space-y-4 text-xs">
        <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-3">
          سجل الصيانة والتحديثات الأخيرة (Maintenance & History Log)
        </h3>

        <div className="space-y-4">
          {pastIncidents.map((inc) => (
            <div key={inc.id} className="border-r-2 border-emerald-500 pr-4 space-y-1">
              <div className="flex items-center justify-between">
                <p className="font-bold text-slate-800 text-xs">{inc.title}</p>
                <span className="text-[11px] text-slate-400 font-mono">{inc.date}</span>
              </div>
              <p className="text-slate-600 text-[11px]">{inc.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Status;
