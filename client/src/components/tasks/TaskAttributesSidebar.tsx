import React from 'react';
import { User as UserIcon, Search, Calendar, UploadCloud, Edit2 } from 'lucide-react';

interface TaskAttributesSidebarProps {
  status: 'todo' | 'doing' | 'review' | 'done';
  setStatus: (val: 'todo' | 'doing' | 'review' | 'done') => void;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  setPriority: (val: 'low' | 'medium' | 'high' | 'urgent') => void;
  assignee: string;
  setAssignee: (val: string) => void;
  dueDate: string;
  setDueDate: (val: string) => void;
  points: number;
  setPoints: (val: number) => void;
}

export const TaskAttributesSidebar: React.FC<TaskAttributesSidebarProps> = ({
  status,
  setStatus,
  priority,
  setPriority,
  assignee,
  setAssignee,
  dueDate,
  setDueDate,
  points,
  setPoints,
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-md p-5 space-y-5 text-xs">
        {/* Status Select */}
        <div className="space-y-1.5">
          <label className="block font-bold text-slate-800">الحالة</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
            className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-slate-800 focus:border-blue-600 focus:outline-none"
          >
            <option value="todo">قيد الانتظار (Todo)</option>
            <option value="doing">قيد العمل (Doing)</option>
            <option value="review">مراجعة (Review)</option>
            <option value="done">مكتملة (Done)</option>
          </select>
        </div>

        {/* Priority Selector */}
        <div className="space-y-1.5">
          <label className="block font-bold text-slate-800">الأولوية</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setPriority('low')}
              className={`py-2 px-3 border rounded-md font-medium text-xs transition-colors flex items-center justify-center gap-1.5 ${
                priority === 'low'
                  ? 'bg-blue-50 border-blue-600 text-blue-600'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
              <span>منخفضة</span>
            </button>

            <button
              type="button"
              onClick={() => setPriority('medium')}
              className={`py-2 px-3 border rounded-md font-medium text-xs transition-colors flex items-center justify-center gap-1.5 ${
                priority === 'medium'
                  ? 'bg-blue-50 border-blue-600 text-blue-600'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              <span>متوسطة</span>
            </button>

            <button
              type="button"
              onClick={() => setPriority('high')}
              className={`py-2 px-3 border rounded-md font-medium text-xs transition-colors flex items-center justify-center gap-1.5 ${
                priority === 'high'
                  ? 'bg-blue-50 border-blue-600 text-blue-600 font-bold'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              <span>عالية</span>
            </button>

            <button
              type="button"
              onClick={() => setPriority('urgent')}
              className={`py-2 px-3 border rounded-md font-medium text-xs transition-colors flex items-center justify-center gap-1.5 ${
                priority === 'urgent'
                  ? 'bg-red-50 border-red-600 text-red-600 font-bold'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
              <span>عاجلة</span>
            </button>
          </div>
        </div>

        {/* Assignee Input */}
        <div className="space-y-1.5">
          <label className="block font-bold text-slate-800">المسند إليه</label>
          <div className="relative">
            <input
              type="text"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-md pr-9 pl-8 py-2 text-slate-800 focus:border-blue-600 focus:outline-none"
            />
            <UserIcon className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        {/* Due Date */}
        <div className="space-y-1.5">
          <label className="block font-bold text-slate-800">تاريخ الاستحقاق</label>
          <div className="relative">
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-slate-800 focus:border-blue-600 focus:outline-none"
            />
            <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Sprint & Points */}
        <div className="border-t border-slate-100 pt-4 space-y-2 text-slate-600">
          <div className="flex justify-between items-center">
            <span>الدورة (Sprint)</span>
            <span className="font-semibold text-slate-800">Sprint 24 - Hydra</span>
          </div>

          <div className="flex justify-between items-center">
            <span>النقاط (Points)</span>
            <div className="flex items-center gap-1 font-semibold text-slate-800">
              <span>{points}</span>
              <button
                type="button"
                onClick={() => setPoints(points === 5 ? 8 : 5)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <Edit2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Dropzone */}
      <div className="bg-white border border-dashed border-slate-300 rounded-md p-6 text-center space-y-2 cursor-pointer hover:bg-slate-50/50 transition-colors">
        <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 mx-auto flex items-center justify-center">
          <UploadCloud className="w-5 h-5" />
        </div>
        <p className="text-xs font-bold text-slate-800">اسحب الملفات هنا أو انقر للرفع</p>
        <p className="text-[11px] text-slate-400">الحد الأقصى لحجم الملف 10 ميجابايت</p>
      </div>
    </div>
  );
};
