import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, CheckSquare, Users } from 'lucide-react';

interface SidebarNavProps {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  onNavClick: () => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  isCollapsed,
  isMobileOpen,
  onNavClick,
}) => {
  const navItems = [
    { label: 'لوحة التحكم', path: '/dashboard', icon: LayoutDashboard },
    { label: 'المشاريع', path: '/projects', icon: FolderKanban },
    { label: 'المهام', path: '/tasks', icon: CheckSquare },
    { label: 'الفريق', path: '/team', icon: Users },
  ];

  return (
    <nav className="flex-1 p-3 sm:p-4 space-y-1">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onNavClick}
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
  );
};
