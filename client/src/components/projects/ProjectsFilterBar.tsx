import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';

interface ProjectsFilterBarProps {
  statusFilter: string;
  leadFilter: string;
  onStatusChange: (val: string) => void;
  onLeadChange: (val: string) => void;
}

export const ProjectsFilterBar: React.FC<ProjectsFilterBarProps> = ({
  statusFilter,
  leadFilter,
  onStatusChange,
  onLeadChange,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      {/* Filter Select Controls */}
      <div className="flex flex-wrap items-center gap-4 text-xs">
        <div className="space-y-1">
          <label className="block text-slate-500 font-medium">تصفية حسب الحالة</label>
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="bg-white border border-slate-300 rounded-md px-3 py-2 text-slate-800 focus:border-blue-600 focus:outline-none transition-colors"
          >
            <option value="all">جميع المشاريع</option>
            <option value="in-progress">قيد التنفيذ</option>
            <option value="critical">حرج</option>
            <option value="on-hold">معلق</option>
            <option value="completed">مكتمل</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-slate-500 font-medium">المسؤول</label>
          <select
            value={leadFilter}
            onChange={(e) => onLeadChange(e.target.value)}
            className="bg-white border border-slate-300 rounded-md px-3 py-2 text-slate-800 focus:border-blue-600 focus:outline-none transition-colors"
          >
            <option value="all">جميع المسئولين</option>
            <option value="سارة">سارة محمود</option>
            <option value="أحمد">أحمد ماهر</option>
            <option value="محمد">محمد علي</option>
            <option value="مريم">مريم حسن</option>
            <option value="عمر">عمر خالد</option>
          </select>
        </div>
      </div>

      {/* New Project Button */}
      <button
        onClick={() => navigate('/projects/new')}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-md transition-colors text-xs flex items-center gap-2 self-end sm:self-auto"
      >
        <Plus className="w-4 h-4" />
        <span>مشروع جديد</span>
      </button>
    </div>
  );
};
