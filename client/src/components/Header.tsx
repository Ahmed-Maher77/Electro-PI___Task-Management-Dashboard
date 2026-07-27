import React from 'react';
import { Search, Bell, User as UserIcon } from 'lucide-react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

export const Header: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between text-slate-100">
      <div className="flex items-center gap-3 w-72">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search projects, tasks..."
            className="w-full bg-slate-800 text-sm text-slate-200 pl-9 pr-4 py-2 rounded-lg border border-slate-700 focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full" />
        </button>

        <div className="flex items-center gap-3 border-l border-slate-800 pl-4">
          <div className="w-9 h-9 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-semibold">
            {user?.name ? user.name.charAt(0).toUpperCase() : <UserIcon className="w-4 h-4" />}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-sm font-medium text-slate-200">{user?.name || 'Guest User'}</p>
            <p className="text-xs text-slate-400">{user?.email || 'user@example.com'}</p>
          </div>
        </div>
      </div>
    </header>
  );
};
