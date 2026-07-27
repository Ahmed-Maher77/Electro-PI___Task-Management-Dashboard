import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, User, LogOut, Terminal } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logout as logoutAction } from '../store/authSlice';
import { logoutApi } from '../api/auth.api';

export const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Logout handler clearing cookie & client state
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
    { label: 'الملف الشخصي', path: '/profile', icon: User },
  ];

  return (
    <aside className="w-64 bg-white text-slate-800 flex flex-col min-h-screen border-l border-slate-200">
      
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-200 flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center font-bold text-white">
          <Terminal className="w-4 h-4" />
        </div>
        <span className="font-bold text-lg text-slate-900">Electro-Pi</span>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-md transition-colors font-medium text-sm ${
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

      {/* Logout Action */}
      <div className="p-4 border-t border-slate-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors font-medium text-sm"
        >
          <LogOut className="w-4 h-4" />
          <span>تسجيل الخروج</span>
        </button>
      </div>

    </aside>
  );
};
