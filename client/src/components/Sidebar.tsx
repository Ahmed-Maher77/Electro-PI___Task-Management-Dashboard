import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Users,
  Plus,
  Settings,
  HelpCircle,
  LogOut,
  Terminal,
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logout as logoutAction } from '../store/authSlice';
import { logoutApi } from '../api/auth.api';

export const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle logout action
  const handleLogout = async () => {
    try {
      await logoutApi();
    } catch {
      // Clear client session anyway
    } finally {
      dispatch(logoutAction());
      navigate('/login');
    }
  };

  const navItems = [
    { label: 'لوحة التحكم', path: '/dashboard', icon: LayoutDashboard },
    { label: 'المشاريع', path: '/projects', icon: FolderKanban },
    { label: 'المهام', path: '/tasks', icon: CheckSquare },
    { label: 'الفريق', path: '/team', icon: Users },
  ];

  return (
    <aside className="w-64 bg-white text-slate-800 flex flex-col h-screen sticky top-0 border-l border-slate-200 select-none overflow-y-auto flex-shrink-0">
      
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-200 flex items-start gap-3">
        <div className="w-8 h-8 rounded bg-blue-600 text-white flex items-center justify-center font-bold mt-0.5">
          <Terminal className="w-4 h-4" />
        </div>
        <div>
          <h2 className="font-bold text-base text-slate-900 leading-tight">Electro-Pi</h2>
          <p className="text-[11px] text-slate-500 font-medium">المستوى المؤسسي (Enterprise Tier)</p>
        </div>
      </div>

      {/* Primary Navigation Links */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-md transition-colors font-medium text-sm ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Action Button & Secondary Links */}
      <div className="p-4 border-t border-slate-200 space-y-4">
        
        <button
          onClick={() => navigate('/tasks')}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-md transition-colors text-xs flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>إنشاء مهمة</span>
        </button>

        <div className="space-y-1 text-xs">
          <NavLink
            to="/settings"
            className="flex items-center gap-3 px-3 py-2 rounded-md text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors font-medium"
          >
            <Settings className="w-4 h-4" />
            <span>الإعدادات</span>
          </NavLink>

          <a
            href="#support"
            onClick={(e) => e.preventDefault()}
            className="flex items-center gap-3 px-3 py-2 rounded-md text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors font-medium"
          >
            <HelpCircle className="w-4 h-4" />
            <span>الدعم الفني</span>
          </a>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors font-medium text-right"
          >
            <LogOut className="w-4 h-4" />
            <span>تسجيل الخروج</span>
          </button>
        </div>

      </div>

    </aside>
  );
};
