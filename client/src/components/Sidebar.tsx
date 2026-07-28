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
  ChevronRight,
  ChevronLeft,
  X,
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logout as logoutAction } from '../store/authSlice';
import { logoutApi } from '../api/auth.api';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  isMobileOpen: boolean;
  setIsMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  setIsCollapsed,
  isMobileOpen,
  setIsMobileOpen,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle logout
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

  const handleNavClick = () => {
    if (isMobileOpen) {
      setIsMobileOpen(false);
    }
  };

  return (
    <aside
      className={`bg-white text-slate-800 flex flex-col h-screen border-l border-slate-200 select-none overflow-y-auto z-50 transition-all duration-300 ${
        // Desktop positioning & compressible width
        isCollapsed ? 'lg:w-20' : 'lg:w-64'
      } ${
        // Fixed sticky desktop vs fixed drawer mobile
        'fixed lg:sticky top-0 right-0'
      } ${
        // Mobile drawer horizontal transform (RTL)
        isMobileOpen ? 'translate-x-0 w-64' : 'translate-x-full lg:translate-x-0'
      }`}
    >
      {/* Brand Header */}
      <div className="p-4 sm:p-6 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-8 h-8 rounded bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">
            <Terminal className="w-4 h-4" />
          </div>

          {(!isCollapsed || isMobileOpen) && (
            <div className="truncate">
              <h2 className="font-bold text-base text-slate-900 leading-tight truncate">Electro-Pi</h2>
              <p className="text-[11px] text-slate-500 font-medium truncate">المستوى المؤسسي</p>
            </div>
          )}
        </div>

        {/* Mobile Close Button */}
        <button
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden text-slate-400 hover:text-slate-700 p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Desktop Compress Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex items-center justify-center p-1.5 rounded-md text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          title={isCollapsed ? 'توسيع القائمة' : 'ضغط القائمة'}
        >
          {isCollapsed ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </div>

      {/* Primary Navigation Links */}
      <nav className="flex-1 p-3 sm:p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={handleNavClick}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors font-medium text-sm ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                } ${isCollapsed && !isMobileOpen ? 'justify-center px-0' : ''}`
              }
              title={isCollapsed && !isMobileOpen ? item.label : undefined}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {(!isCollapsed || isMobileOpen) && <span className="truncate">{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Action Button & Secondary Links */}
      <div className="p-3 sm:p-4 border-t border-slate-200 space-y-3">
        
        {/* Create Task Button */}
        <button
          onClick={() => {
            handleNavClick();
            navigate('/tasks/new');
          }}
          className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-3 rounded-md transition-colors text-xs flex items-center justify-center gap-2 ${
            isCollapsed && !isMobileOpen ? 'px-0' : ''
          }`}
          title="إنشاء مهمة"
        >
          <Plus className="w-4 h-4 flex-shrink-0" />
          {(!isCollapsed || isMobileOpen) && <span className="truncate">إنشاء مهمة</span>}
        </button>

        {/* Settings, Support, Logout */}
        <div className="space-y-1 text-xs">
          <NavLink
            to="/settings"
            onClick={handleNavClick}
            className={`flex items-center gap-3 px-3 py-2 rounded-md text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors font-medium ${
              isCollapsed && !isMobileOpen ? 'justify-center px-0' : ''
            }`}
            title={isCollapsed && !isMobileOpen ? 'الإعدادات' : undefined}
          >
            <Settings className="w-4 h-4 flex-shrink-0" />
            {(!isCollapsed || isMobileOpen) && <span>الإعدادات</span>}
          </NavLink>

          <NavLink
            to="/support"
            onClick={handleNavClick}
            className={`flex items-center gap-3 px-3 py-2 rounded-md text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors font-medium ${
              isCollapsed && !isMobileOpen ? 'justify-center px-0' : ''
            }`}
            title={isCollapsed && !isMobileOpen ? 'الدعم الفني' : undefined}
          >
            <HelpCircle className="w-4 h-4 flex-shrink-0" />
            {(!isCollapsed || isMobileOpen) && <span>الدعم الفني</span>}
          </NavLink>

          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors font-medium text-right ${
              isCollapsed && !isMobileOpen ? 'justify-center px-0' : ''
            }`}
            title={isCollapsed && !isMobileOpen ? 'تسجيل الخروج' : undefined}
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {(!isCollapsed || isMobileOpen) && <span>تسجيل الخروج</span>}
          </button>
        </div>

      </div>

    </aside>
  );
};
