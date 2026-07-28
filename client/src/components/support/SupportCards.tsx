import React from 'react';
import { BookOpen, ExternalLink, CheckCircle, ShieldCheck } from 'lucide-react';

export const SupportCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
      
      {/* Docs Card */}
      <div
        onClick={() => window.open('https://github.com/Ahmed-Maher77/Electro-PI___Task-Management-Dashboard', '_blank')}
        className="bg-white border border-slate-200 rounded-md p-5 flex items-center justify-between hover:border-blue-300 transition-all cursor-pointer hover:shadow-sm"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">التوثيق الفني (Docs)</h3>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              دليل الربط المباشر ومعاينة مستودع GitHub.
            </p>
          </div>
        </div>
        <ExternalLink className="w-4 h-4 text-slate-400" />
      </div>

      {/* System Status Card */}
      <div className="bg-white border border-slate-200 rounded-md p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">حالة خوادم النظام</h3>
            <p className="text-emerald-700 text-[11px] font-semibold leading-relaxed flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              <span>جميع الخدمات تعمل بكفاءة (99.9%)</span>
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
