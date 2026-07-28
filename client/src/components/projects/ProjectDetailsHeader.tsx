import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Share2, Edit, Check } from 'lucide-react';
import type { Project } from '../../types';

interface ProjectDetailsHeaderProps {
  project: Project | null;
  onEditProject: () => void;
}

export const ProjectDetailsHeader: React.FC<ProjectDetailsHeaderProps> = ({
  project,
  onEditProject,
}) => {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'critical':
        return { label: 'حرج', className: 'bg-red-50 text-red-600 border-red-200' };
      case 'on-hold':
        return { label: 'معلق', className: 'bg-amber-50 text-amber-700 border-amber-200' };
      case 'completed':
        return { label: 'مكتمل', className: 'bg-emerald-50 text-emerald-600 border-emerald-200' };
      case 'in-progress':
      default:
        return { label: 'قيد التنفيذ', className: 'bg-blue-50 text-blue-600 border-blue-200' };
    }
  };

  const badge = getStatusBadge(project?.status);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link to="/projects" className="hover:text-slate-800 transition-colors">
            المشاريع
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold">{project?.title || 'تفاصيل المشروع'}</span>
        </div>

        <div className="flex items-center gap-3 pt-1">
          <h1 className="text-2xl font-bold text-slate-900 leading-tight">
            {project?.title || 'مشروع جديد'}
          </h1>
          <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold border ${badge.className}`}>
            {badge.label}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleShare}
          className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-medium py-2 px-3.5 rounded-md transition-colors text-xs flex items-center gap-1.5"
          title="مشاركة رابط المشروع"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
          <span>{copied ? 'تم النسخ!' : 'مشاركة'}</span>
        </button>
        <button
          onClick={onEditProject}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors text-xs flex items-center gap-1.5"
        >
          <Edit className="w-3.5 h-3.5" />
          <span>تعديل المشروع</span>
        </button>
      </div>
    </div>
  );
};
