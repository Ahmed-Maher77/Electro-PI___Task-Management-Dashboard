import React from 'react';
import { Search, Bell, User as UserIcon } from 'lucide-react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

export const Header: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between text-slate-800">
      
      {/* Search Input */}
      <div className="flex items-center gap-3 w-72">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="بحث في مشاريع Electro-Pi..."
            className="w-full bg-slate-50 text-sm text-slate-900 pr-9 pl-4 py-2 rounded-md border border-slate-200 focus:border-blue-600 focus:bg-white transition-colors placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* User Info & Notifications */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full" />
        </button>

        <div className="flex items-center gap-3 border-r border-slate-200 pr-4">
          <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-semibold text-sm">
            {user?.name ? user.name.charAt(0).toUpperCase() : <UserIcon className="w-4 h-4" />}
          </div>
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium text-slate-900">{user?.name || 'مستخدم زائر'}</p>
            <p className="text-xs text-slate-500">{user?.email || 'user@example.com'}</p>
          </div>
        </div>
      </div>

    </header>
  );
};
