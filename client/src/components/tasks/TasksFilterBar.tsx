import React from 'react';
import { Search, Filter } from 'lucide-react';

interface TasksFilterBarProps {
  searchTerm: string;
  statusFilter: string;
  priorityFilter: string;
  onSearchChange: (val: string) => void;
  onStatusChange: (val: string) => void;
  onPriorityChange: (val: string) => void;
}

export const TasksFilterBar: React.FC<TasksFilterBarProps> = ({
  searchTerm,
  statusFilter,
  priorityFilter,
  onSearchChange,
  onStatusChange,
  onPriorityChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
      {/* Search Input */}
      <div className="relative w-full sm:w-80">
        <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="بحث باسم المهمة أو المعرف..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-white border border-slate-300 rounded-md pr-9 pl-4 py-2 text-slate-800 focus:border-blue-600 focus:outline-none"
        />
      </div>

      {/* Select Filters */}
      <div className="flex items-center gap-3 self-start sm:self-auto w-full sm:w-auto">
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-500 font-medium">الحالة:</span>
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="bg-white border border-slate-300 rounded-md px-3 py-2 text-slate-800 focus:border-blue-600 focus:outline-none"
          >
            <option value="all">جميع الحالات</option>
            <option value="todo">قيد الانتظار</option>
            <option value="doing">قيد العمل</option>
            <option value="review">مراجعة</option>
            <option value="done">مكتملة</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-medium">الأولوية:</span>
          <select
            value={priorityFilter}
            onChange={(e) => onPriorityChange(e.target.value)}
            className="bg-white border border-slate-300 rounded-md px-3 py-2 text-slate-800 focus:border-blue-600 focus:outline-none"
          >
            <option value="all">جميع الأولويات</option>
            <option value="low">منخفضة</option>
            <option value="medium">متوسطة</option>
            <option value="high">عالية</option>
          </select>
        </div>
      </div>
    </div>
  );
};
