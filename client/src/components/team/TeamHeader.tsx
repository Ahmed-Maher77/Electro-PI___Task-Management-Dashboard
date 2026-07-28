import React from 'react';
import { UserPlus } from 'lucide-react';

interface TeamHeaderProps {
  onOpenInviteModal: () => void;
}

export const TeamHeader: React.FC<TeamHeaderProps> = ({ onOpenInviteModal }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-900">أعضاء الفريق</h1>
        <p className="text-xs text-slate-500 font-medium">
          إدارة أعضاء الفريق والصلاحيات والمسؤوليات عبر المنظمة.
        </p>
      </div>

      <button
        onClick={onOpenInviteModal}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-md transition-colors text-xs flex items-center gap-2"
      >
        <UserPlus className="w-4 h-4" />
        <span>دعوة عضو جديد</span>
      </button>
    </div>
  );
};
