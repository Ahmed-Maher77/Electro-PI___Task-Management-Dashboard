import React from 'react';
import { CheckCircle, Globe, Server, Database, ShieldCheck } from 'lucide-react';

export const Status: React.FC = () => {
  const services = [
    { name: 'الواجهة الأمامية (Frontend App)', status: 'شغالة', latency: '18ms', icon: Globe },
    { name: 'خوادم API والخلفية (Node.js Server)', status: 'شغالة', latency: '35ms', icon: Server },
    { name: 'قواعد البيانات (MongoDB Cluster)', status: 'شغالة', latency: '12ms', icon: Database },
    { name: 'الجدار الناري والأمان (Security)', status: 'شغالة', latency: '5ms', icon: ShieldCheck },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto text-right ">
      
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-900">حالة النظام</h1>
        <p className="text-xs text-slate-500 font-medium">
          متابعة حالة التشغيل المباشرة لخوادم منصة Electro-Pi.
        </p>
      </div>

      {/* Operational Banner */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-md p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CheckCircle className="w-6 h-6 text-emerald-600" />
          <div>
            <h2 className="font-bold text-emerald-900 text-sm">جميع الأنظمة تعمل بكفاءة (99.99%)</h2>
            <p className="text-emerald-700 text-xs mt-0.5">متوسط زمن الاستجابة: 28ms</p>
          </div>
        </div>

        <span className="text-[11px] font-semibold text-emerald-800 bg-white border border-emerald-200 px-3 py-1 rounded-md">
          تحديث حي
        </span>
      </div>

      {/* Services List */}
      <div className="bg-white border border-slate-200 rounded-md divide-y divide-slate-100 text-xs">
        {services.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-slate-100 text-slate-700 flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">{s.name}</p>
                  <p className="text-slate-400 text-[11px]">الاستجابة: {s.latency}</p>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                <span>{s.status}</span>
              </span>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default Status;
