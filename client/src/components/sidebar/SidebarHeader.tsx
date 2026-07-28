import React from 'react';
import { ChevronRight, ChevronLeft, X } from 'lucide-react';
import BrandLogo from '../BrandLogo';

interface SidebarHeaderProps {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  isMobileOpen: boolean;
  setIsMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  isCollapsed,
  setIsCollapsed,
  isMobileOpen,
  setIsMobileOpen,
}) => {
  return (
    <div className="p-4 py-3 border-b border-slate-200 flex items-center justify-between">
      <div className="flex items-center gap-3 overflow-hidden">
        <BrandLogo />

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
  );
};
