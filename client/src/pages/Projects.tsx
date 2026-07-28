import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, MoreVertical, ChevronRight, ChevronLeft, User as UserIcon } from 'lucide-react';
import { getProjectsApi, deleteProjectApi } from '../api/projects.api';
import type { Project } from '../types';

export const Projects: React.FC = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filters
  const [statusFilter, setStatusFilter] = useState('all');
  const [leadFilter, setLeadFilter] = useState('all');

  // Real Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Active row dropdown state
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await getProjectsApi();
      setProjects(res.data || []);
    } catch (err: any) {
      setError(err.message || 'فشل تحميل قائمة المشاريع');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDeleteProject = async (id: string) => {
    if (!confirm('هل أنت تأكد من رغبتك في حذف هذا المشروع؟')) return;
    try {
      await deleteProjectApi(id);
      setProjects(projects.filter((p) => (p._id || p.id) !== id));
      setActiveMenuId(null);
    } catch (err: any) {
      alert(err.message || 'فشل حذف المشروع');
    }
  };

  // Filter projects list
  const filteredProjects = projects.filter((p) => {
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    const matchesLead = leadFilter === 'all' || (p.leadName && p.leadName.includes(leadFilter));
    return matchesStatus && matchesLead;
  });

  // Calculate real pagination slices
  const totalItems = filteredProjects.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

  // Handle filter changes (reset page)
  const handleStatusFilterChange = (val: string) => {
    setStatusFilter(val);
    setCurrentPage(1);
  };

  const handleLeadFilterChange = (val: string) => {
    setLeadFilter(val);
    setCurrentPage(1);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'critical':
        return { label: 'حرج', className: 'text-red-600' };
      case 'on-hold':
        return { label: 'معلق', className: 'text-amber-700' };
      case 'completed':
        return { label: 'مكتمل', className: 'text-blue-600' };
      case 'in-progress':
      default:
        return { label: 'قيد التنفيذ', className: 'text-blue-600' };
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto text-right ">
      
      {/* Top Filter Bar & Create Action */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <div className="space-y-1">
            <label className="block text-slate-500 font-medium">تصفية حسب الحالة</label>
            <select
              value={statusFilter}
              onChange={(e) => handleStatusFilterChange(e.target.value)}
              className="bg-white border border-slate-300 rounded-md px-3 py-2 text-slate-800 focus:border-blue-600 focus:outline-none transition-colors"
            >
              <option value="all">جميع المشاريع</option>
              <option value="in-progress">قيد التنفيذ</option>
              <option value="critical">حرج</option>
              <option value="on-hold">معلق</option>
              <option value="completed">مكتمل</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="block text-slate-500 font-medium">المسؤول</label>
            <select
              value={leadFilter}
              onChange={(e) => handleLeadFilterChange(e.target.value)}
              className="bg-white border border-slate-300 rounded-md px-3 py-2 text-slate-800 focus:border-blue-600 focus:outline-none transition-colors"
            >
              <option value="all">جميع المسئولين</option>
              <option value="سارة">سارة محمود</option>
              <option value="أحمد">أحمد ماهر</option>
              <option value="محمد">محمد علي</option>
              <option value="مريم">مريم حسن</option>
              <option value="عمر">عمر خالد</option>
            </select>
          </div>
        </div>

        {/* New Project Button */}
        <button
          onClick={() => navigate('/projects/new')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-md transition-colors text-xs flex items-center gap-2 self-end sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>مشروع جديد</span>
        </button>

      </div>

      {/* Main Table Card */}
      <div className="bg-white border border-slate-200 rounded-md overflow-hidden">
        
        {loading ? (
          <div className="p-12 text-center text-xs font-medium text-slate-500">
            جاري تحميل قائمة المشاريع...
          </div>
        ) : error ? (
          <div className="p-6 bg-red-50 text-red-700 text-xs text-center">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px] font-bold">
                  <th className="py-3.5 px-5">اسم المشروع</th>
                  <th className="py-3.5 px-5">الحالة</th>
                  <th className="py-3.5 px-5">المسؤول</th>
                  <th className="py-3.5 px-5">تاريخ الاستحقاق</th>
                  <th className="py-3.5 px-5">نسبة الإنجاز</th>
                  <th className="py-3.5 px-5 text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedProjects.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400">
                      لا توجد مشاريع مطابقة للفلاتر المحددة.
                    </td>
                  </tr>
                ) : (
                  paginatedProjects.map((p) => {
                    const projectId = p._id || p.id || '';
                    const badge = getStatusBadge(p.status);
                    const isCritical = p.status === 'critical';

                    return (
                      <tr key={projectId} className="hover:bg-slate-50/80 transition-colors">
                        
                        {/* Project Name & Subtitle */}
                        <td className="py-4 px-5">
                          <p className="font-bold text-slate-900 text-sm leading-snug">{p.title}</p>
                          <p className="text-slate-400 text-[11px] mt-0.5">{p.subtitle || 'تطوير المنصة'}</p>
                        </td>

                        {/* Status Badge */}
                        <td className="py-4 px-5">
                          <span className={`inline-block px-2.5 py-1 rounded text-[11px] font-bold ${badge.className}`}>
                            {badge.label}
                          </span>
                        </td>

                        {/* Lead */}
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-[10px]">
                              {p.leadName ? p.leadName.charAt(0) : <UserIcon className="w-3 h-3" />}
                            </div>
                            <span className="font-medium text-slate-800">{p.leadName || 'أحمد ماهر'}</span>
                          </div>
                        </td>

                        {/* Due Date */}
                        <td className="py-4 px-5 font-medium text-slate-600 whitespace-nowrap">
                          {p.dueDate || '24 أكتوبر 2024'}
                        </td>

                        {/* Progress Gauge */}
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-3 w-44">
                            <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${isCritical ? 'bg-red-600' : 'bg-blue-600'}`}
                                style={{ width: `${p.progress || 0}%` }}
                              />
                            </div>
                            <span className="font-bold text-slate-700 text-[11px]">{p.progress || 0}%</span>
                          </div>
                        </td>

                        {/* Actions Menu */}
                        <td className="py-4 px-5 text-center relative">
                          <button
                            onClick={() => setActiveMenuId(activeMenuId === projectId ? null : projectId)}
                            className="p-1 text-slate-400 hover:text-slate-700 rounded transition-colors"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>

                          {activeMenuId === projectId && (
                            <div className="absolute left-4 top-10 w-36 bg-white border border-slate-200 rounded-md z-20 py-1 text-right text-xs">
                              <button
                                onClick={() => {
                                  setActiveMenuId(null);
                                  navigate(`/projects/${projectId}`);
                                }}
                                className="w-full text-right px-3 py-1.5 hover:bg-slate-50 text-slate-700"
                              >
                                عرض التفاصيل
                              </button>
                              <button
                                onClick={() => handleDeleteProject(projectId)}
                                className="w-full text-right px-3 py-1.5 hover:bg-red-50 text-red-600"
                              >
                                حذف المشروع
                              </button>
                            </div>
                          )}
                        </td>

                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Real Dynamic Pagination Controls */}
        <div className="bg-slate-50/50 border-t border-slate-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>
            عرض{' '}
            <span className="font-semibold text-slate-800">
              {totalItems === 0 ? 0 : startIndex + 1}
            </span>{' '}
            إلى{' '}
            <span className="font-semibold text-slate-800">{endIndex}</span> من أصل{' '}
            <span className="font-semibold text-slate-800">{totalItems}</span> مشروعاً
          </p>

          <div className="flex items-center gap-1 font-medium">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="w-7 h-7 flex items-center justify-center border border-slate-200 bg-white rounded text-slate-600 hover:bg-slate-100 disabled:opacity-40"
              title="الصفحة السابقة"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-7 h-7 flex items-center justify-center rounded font-bold transition-colors ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-100'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="w-7 h-7 flex items-center justify-center border border-slate-200 bg-white rounded text-slate-600 hover:bg-slate-100 disabled:opacity-40"
              title="الصفحة التالية"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Projects;
