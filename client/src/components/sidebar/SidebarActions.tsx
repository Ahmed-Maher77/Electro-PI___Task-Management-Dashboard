import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Plus, Settings, HelpCircle, LogOut } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logout as logoutAction } from '../../store/authSlice';
import { logoutApi } from '../../api/auth.api';

interface SidebarActionsProps {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  onNavClick: () => void;
}

export const SidebarActions: React.FC<SidebarActionsProps> = ({
  isCollapsed,
  isMobileOpen,
  onNavClick,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  return (
    <div className="p-3 sm:p-4 border-t border-slate-200 space-y-3">
      {/* Create Task Button */}
      <button
        onClick={() => {
          onNavClick();
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

      {/* Secondary Links */}
      <div className="space-y-1 text-xs">
        <NavLink
          to="/settings"
          onClick={onNavClick}
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
          onClick={onNavClick}
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
  );
};
