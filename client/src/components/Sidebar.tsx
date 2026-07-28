import React from 'react';
import type { SidebarProps } from '../types';
import { SidebarHeader } from './sidebar/SidebarHeader';
import { SidebarNav } from './sidebar/SidebarNav';
import { SidebarActions } from './sidebar/SidebarActions';

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  setIsCollapsed,
  isMobileOpen,
  setIsMobileOpen,
}) => {
  const handleNavClick = () => {
    if (isMobileOpen) {
      setIsMobileOpen(false);
    }
  };

  return (
    <aside
      className={`bg-white text-slate-800 flex flex-col h-screen border-l border-slate-200 overflow-y-auto z-50 transition-all duration-300 fixed lg:sticky top-0 right-0 ${
        isCollapsed ? 'lg:w-20' : 'lg:w-56'
      } ${
        isMobileOpen ? 'translate-x-0 w-64' : 'translate-x-full lg:translate-x-0'
      }`}
    >
      <SidebarHeader
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      <SidebarNav
        isCollapsed={isCollapsed}
        isMobileOpen={isMobileOpen}
        onNavClick={handleNavClick}
      />

      <SidebarActions
        isCollapsed={isCollapsed}
        isMobileOpen={isMobileOpen}
        onNavClick={handleNavClick}
      />
    </aside>
  );
};
