import React, { useState, useEffect, useRef } from 'react';
import { Search, HelpCircle, User as UserIcon, Menu, FolderKanban, CheckSquare, X } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../store';
import { getProjectsApi } from '../api/projects.api';
import { getAllTasksApi } from '../api/tasks.api';
import type { Project, Task, HeaderProps } from '../types';

export const Header: React.FC<HeaderProps> = ({ onToggleMobileMenu }) => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [allTasks, setAllTasks] = useState<Task[]>([]);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Load items for search
  useEffect(() => {
    Promise.all([getProjectsApi(), getAllTasksApi()])
      .then(([pRes, tRes]) => {
        setAllProjects(pRes.data || []);
        setAllTasks(tRes.data || []);
      })
      .catch(() => {});
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter items matching query
  const trimmedQuery = query.trim().toLowerCase();
  const matchedProjects = trimmedQuery
    ? allProjects.filter(
        (p) =>
          p.title.toLowerCase().includes(trimmedQuery) ||
          (p.subtitle && p.subtitle.toLowerCase().includes(trimmedQuery))
      )
    : [];

  const matchedTasks = trimmedQuery
    ? allTasks.filter(
        (t) =>
          t.title.toLowerCase().includes(trimmedQuery) ||
          (t.taskIdCode && t.taskIdCode.toLowerCase().includes(trimmedQuery))
      )
    : [];

  const hasResults = matchedProjects.length > 0 || matchedTasks.length > 0;

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between text-slate-800 sticky top-0 z-20 flex-shrink-0 w-full">
      
      {/* Mobile Burger Menu Button */}
      <button
        onClick={onToggleMobileMenu}
        className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
        title="افتح القائمة"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Center Search Bar with Dropdown */}
      <div ref={dropdownRef} className="relative flex items-center gap-3 w-48 sm:w-90 lg:w-[60%] max-sm:hidden">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="بحث مباشر في المشاريع والمهام..."
            className="w-full bg-slate-50 text-xs text-slate-900 pr-9 pl-8 py-2 rounded-md border border-slate-200 focus:border-blue-600 focus:bg-white transition-colors placeholder:text-slate-400"
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                setIsOpen(false);
              }}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Live Search Results Popup */}
        {isOpen && trimmedQuery && (
          <div className="absolute top-11 right-0 left-0 bg-white border border-slate-200 rounded-md shadow-lg z-50 overflow-hidden text-right text-xs max-h-96 overflow-y-auto">
            {!hasResults ? (
              <div className="p-4 text-center text-slate-400">
                لا توجد نتائج مطابقة لـ "{query}"
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                
                {/* Matching Projects */}
                {matchedProjects.length > 0 && (
                  <div className="p-2 space-y-1">
                    <p className="text-[11px] font-bold text-slate-400 px-2 py-1 uppercase">المشاريع</p>
                    {matchedProjects.slice(0, 4).map((p) => {
                      const id = p._id || p.id || '';
                      return (
                        <div
                          key={id}
                          onClick={() => {
                            setIsOpen(false);
                            setQuery('');
                            navigate(`/projects/${id}`);
                          }}
                          className="flex items-center gap-2.5 p-2 rounded hover:bg-slate-50 cursor-pointer text-slate-800 transition-colors"
                        >
                          <FolderKanban className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          <div className="truncate">
                            <p className="font-bold text-slate-900 truncate">{p.title}</p>
                            <p className="text-[11px] text-slate-400 truncate">{p.subtitle || 'مشروع'}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Matching Tasks */}
                {matchedTasks.length > 0 && (
                  <div className="p-2 space-y-1">
                    <p className="text-[11px] font-bold text-slate-400 px-2 py-1 uppercase">المهام</p>
                    {matchedTasks.slice(0, 5).map((t) => {
                      const id = t._id || t.id || '';
                      return (
                        <div
                          key={id}
                          onClick={() => {
                            setIsOpen(false);
                            setQuery('');
                            navigate('/tasks');
                          }}
                          className="flex items-center gap-2.5 p-2 rounded hover:bg-slate-50 cursor-pointer text-slate-800 transition-colors"
                        >
                          <CheckSquare className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          <div className="truncate">
                            <p className="font-bold text-slate-900 truncate">{t.title}</p>
                            <p className="text-[11px] text-slate-400 truncate">
                              {t.taskIdCode || 'TASK'} • {t.assigneeName || 'غير مسند'}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

              </div>
            )}
          </div>
        )}
      </div>

      {/* Left Header Actions */}
      <div className="flex items-center gap-3 sm:gap-5">
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
