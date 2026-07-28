import React from 'react';
import { BookOpen, ExternalLink } from 'lucide-react';

export const SupportCards: React.FC = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-md p-5 flex items-center justify-between hover:bg-slate-50/80 transition-colors cursor-pointer text-xs"
         onClick={() => window.open('https://github.com/Ahmed-Maher77/Electro-PI___Task-Management-Dashboard', '_blank')}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
          <BookOpen className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900 text-sm">التوثيق الفني للربط والمشاريع (Docs)</h3>
          <p className="text-slate-500 text-[11px] leading-relaxed">
            استعرض الأدلة الإرشادية وواجهات الاستخدام REST API للمشروع على GitHub.
          </p>
        </div>
      </div>
      <ExternalLink className="w-4 h-4 text-slate-400" />
    </div>
  );
};
