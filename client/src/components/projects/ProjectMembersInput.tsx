import React from 'react';
import { UserPlus, X, User as UserIcon } from 'lucide-react';

interface ProjectMembersInputProps {
  members: string[];
  newMemberInput: string;
  setNewMemberInput: (val: string) => void;
  onAddMember: () => void;
  onRemoveMember: (name: string) => void;
}

export const ProjectMembersInput: React.FC<ProjectMembersInputProps> = ({
  members,
  newMemberInput,
  setNewMemberInput,
  onAddMember,
  onRemoveMember,
}) => {
  return (
    <div className="space-y-2 border-t border-slate-100 pt-6 text-xs">
      <div className="flex items-center justify-between">
        <div>
          <label className="block sm:text-sm font-bold text-slate-800">
            أعضاء الفريق
          </label>
          <p className="text-[11px] text-slate-400">
            سيكون للمستخدمين المحددين صلاحية القراءة والكتابة افتراضياً.
          </p>
        </div>

        <button
          type="button"
          onClick={onAddMember}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1.5"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>إضافة عضو</span>
        </button>
      </div>

      <div className="border border-slate-300 rounded-md p-2.5 flex flex-wrap items-center gap-2 bg-white min-h-[44px]">
        {members.map((member) => (
          <div
            key={member}
            className="bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1.5"
          >
            <UserIcon className="w-3 h-3 text-slate-500" />
            <span>{member}</span>
            <button
              type="button"
              onClick={() => onRemoveMember(member)}
              className="text-slate-400 hover:text-slate-700 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}

        <input
          type="text"
          placeholder="اكتب اسماً للإضافة..."
          value={newMemberInput}
          onChange={(e) => setNewMemberInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              onAddMember();
            }
          }}
          className="flex-1 min-w-[140px] bg-transparent text-xs text-slate-800 focus:outline-none px-1"
        />
      </div>
    </div>
  );
};
