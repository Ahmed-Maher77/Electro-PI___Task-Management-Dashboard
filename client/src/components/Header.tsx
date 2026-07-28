import React from 'react';
import { Search, Bell, HelpCircle, User as UserIcon, Menu } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../store';

interface HeaderProps {
  onToggleMobileMenu?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleMobileMenu }) => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between text-slate-800 sticky top-0 z-20">
      
      {/* Right Side (RTL): Mobile Burger Menu Button & Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
          title="افتح القائمة"
        >
          <Menu className="w-5 h-5" />
        </button>

        <h1 className="text-base sm:text-lg font-bold text-slate-900 hidden sm:block">
          ملخص المشروع
        </h1>
      </div>

      {/* Center Search Input */}
      <div className="flex items-center gap-3 w-48 sm:w-80">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="بحث في المهام أو الملفات..."
            className="w-full bg-slate-50 text-xs text-slate-900 pr-9 pl-4 py-2 rounded-md border border-slate-200 focus:border-blue-600 focus:bg-white transition-colors placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Left Header Actions */}
      <div className="flex items-center gap-3 sm:gap-5">
        <a
          href="#feedback"
          onClick={(e) => e.preventDefault()}
          className="text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors hidden md:block"
        >
          الملاحظات
        </a>

        <button className="relative p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full" />
        </button>

        <button
          onClick={() => navigate('/support')}
          className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
          title="الدعم الفني"
        >
          <HelpCircle className="w-5 h-5" />
        </button>

        {/* User Avatar */}
        <div
          onClick={() => navigate('/profile')}
          className="flex items-center gap-2 border-r border-slate-200 pr-3 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-700 font-semibold text-xs overflow-hidden">
            {user?.name ? (
              user.name.charAt(0).toUpperCase()
            ) : (
              <UserIcon className="w-4 h-4 text-slate-600" />
            )}
          </div>
        </div>
      </div>

    </header>
  );
};
