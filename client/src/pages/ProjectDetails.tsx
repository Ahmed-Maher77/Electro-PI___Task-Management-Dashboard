import React from 'react';
import { useParams, Link } from 'react-router-dom';

export const ProjectDetails: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/projects" className="hover:text-slate-800">
          المشاريع
        </Link>
        <span>/</span>
        <span className="text-slate-800">{projectId}</span>
      </div>

      <div>
        <h1 className="text-xl font-bold text-slate-900">تفاصيل المشروع: {projectId}</h1>
        <p className="text-slate-500 text-xs mt-1">عرض وإدارة المهام المتعلقة بهذا المشروع.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-md p-6">
        <h3 className="text-sm font-semibold text-slate-900 mb-3">مهام المشروع</h3>
        <p className="text-slate-500 text-xs">لا توجد مهام مضافة لهذا المشروع بعد.</p>
      </div>
    </div>
  );
};

export default ProjectDetails;
