import React from 'react';
import { Link } from 'react-router-dom';

export const Projects: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">المشاريع</h1>
          <p className="text-slate-500 text-xs mt-1">إدارة ومتابعة المشاريع الخاصة بك.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors text-xs">
          + مشروع جديد
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-md p-8 text-center text-slate-500 text-sm">
        <p>لا توجد مشاريع حالياً. أنشئ مشروعاً جديداً للبدء!</p>
        <Link to="/projects/sample-id" className="text-blue-600 text-xs hover:underline mt-2 inline-block">
          (عرض مشروع تجريبي)
        </Link>
      </div>
    </div>
  );
};

export default Projects;
