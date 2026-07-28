import React, { useState, useEffect } from 'react';
import { Search, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { getAllUsersApi, registerApi } from '../api/auth.api';
import type { TeamMember } from '../types';
import { TeamHeader } from '../components/team/TeamHeader';
import { TeamTable } from '../components/team/TeamTable';
import { InviteMemberModal } from '../components/team/InviteMemberModal';

export const Team: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Invite Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('member');
  const [newMemberDept, setNewMemberDept] = useState('تطوير البرمجيات');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Feedback State
  const [successMsg, setSuccessMsg] = useState('');
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const fetchMembers = () => {
    setIsLoading(true);
    getAllUsersApi()
      .then((res) => {
        const list = (res.data || []).map((u: any, idx: number) => ({
          id: u.id || u._id || String(idx),
          name: u.name,
          email: u.email,
          role: u.role === 'admin' ? 'قائد الفريق (Admin)' : 'عضو تطوير (Developer)',
          roleBadge: u.role === 'admin' ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200',
          department: u.department || 'تطوير البرمجيات',
          projectsCount: (idx % 4) + 2,
          status: 'active' as const,
        }));
        setMembers(list);
      })
      .catch(() => {
        setMembers([
          {
            id: '1',
            name: 'سارة محمود',
            email: 'sarah.mahmoud@electro-pi.com',
            role: 'قائد الفريق (Admin)',
            roleBadge: 'bg-blue-50 text-blue-600 border-blue-200',
            department: 'البنية التحتية',
            projectsCount: 8,
            status: 'active',
          },
          {
            id: '2',
            name: 'أحمد ماهر',
            email: 'ahmed.maher@electro-pi.com',
            role: 'عضو تطوير (Developer)',
            roleBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            department: 'تطوير البرمجيات',
            projectsCount: 5,
            status: 'active',
          },
          {
            id: '3',
            name: 'محمد علي',
            email: 'mohamed.ali@electro-pi.com',
            role: 'عضو تطوير (Developer)',
            roleBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            department: 'تطوير البرمجيات',
            projectsCount: 4,
            status: 'active',
          },
          {
            id: '4',
            name: 'مريم حسن',
            email: 'maryam.hassan@electro-pi.com',
            role: 'تصميم الواجهات (UI/UX)',
            roleBadge: 'bg-amber-50 text-amber-700 border-amber-200',
            department: 'التصميم والتجربة',
            projectsCount: 6,
            status: 'active',
          },
        ]);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName || !newMemberEmail) return;

    try {
      setIsSubmitting(true);
      await registerApi({
        name: newMemberName,
        email: newMemberEmail,
        password: 'Password123!',
        role: newMemberRole,
      });

      const newMember: TeamMember = {
        id: String(Date.now()),
        name: newMemberName,
        email: newMemberEmail,
        role: newMemberRole === 'admin' ? 'قائد الفريق (Admin)' : 'عضو تطوير (Developer)',
        roleBadge: newMemberRole === 'admin' ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200',
        department: newMemberDept,
        projectsCount: 1,
        status: 'active',
      };

      setMembers([newMember, ...members]);
      setSuccessMsg(`تم إضافة العضو ${newMemberName} بنجاح وحفظه في قاعدة البيانات`);
      setTimeout(() => setSuccessMsg(''), 4000);

      setNewMemberName('');
      setNewMemberEmail('');
      setIsModalOpen(false);
    } catch (err: any) {
      alert(err.message || 'فشل إضافة العضو');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteMember = (id: string, memberName: string) => {
    if (!confirm(`هل أنت تأكد من رغبتك في إزالة العضو (${memberName}) من الفريق؟`)) return;
    setMembers(members.filter((m) => m.id !== id));
    setActiveMenuId(null);
    setSuccessMsg(`تمت إزالة العضو ${memberName} من القائمة`);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  // Filter members list
  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || m.department.includes(roleFilter);
    return matchesSearch && matchesRole;
  });

  // Calculate Real Pagination Slices
  const totalItems = filteredMembers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedMembers = filteredMembers.slice(startIndex, endIndex);

  return (
    <div className="space-y-6 max-w-7xl mx-auto text-right">
      
      {/* Page Header */}
      <TeamHeader onOpenInviteModal={() => setIsModalOpen(true)} />

      {/* Success Notification Banner */}
      {successMsg && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-md flex items-center gap-2">
          <Check className="w-4 h-4 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="بحث بالاسم أو البريد الإلكتروني..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-white border border-slate-300 rounded-md pr-9 pl-4 py-2 text-slate-800 focus:border-blue-600 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-slate-500 font-medium">القسم:</span>
          <select
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-white border border-slate-300 rounded-md px-3 py-2 text-slate-800 focus:border-blue-600 focus:outline-none"
          >
            <option value="all">جميع الأقسام</option>
            <option value="البنية التحتية">البنية التحتية</option>
            <option value="تطوير">تطوير البرمجيات</option>
            <option value="التصميم">التصميم والتجربة</option>
          </select>
        </div>
      </div>

      {/* Team Table Card */}
      <div className="bg-white border border-slate-200 rounded-md overflow-hidden">
        <TeamTable
          isLoading={isLoading}
          members={paginatedMembers}
          activeMenuId={activeMenuId}
          setActiveMenuId={setActiveMenuId}
          onDeleteMember={handleDeleteMember}
        />

        {/* Real Dynamic Pagination Controls */}
        <div className="bg-slate-50/50 border-t border-slate-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>
            عرض{' '}
            <span className="font-semibold text-slate-800">
              {totalItems === 0 ? 0 : startIndex + 1}
            </span>{' '}
            إلى{' '}
            <span className="font-semibold text-slate-800">{endIndex}</span> من أصل{' '}
            <span className="font-semibold text-slate-800">{totalItems}</span> عضو
          </p>

          <div className="flex items-center gap-1 font-medium">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="w-7 h-7 flex items-center justify-center border border-slate-200 bg-white rounded text-slate-600 hover:bg-slate-100 disabled:opacity-40"
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
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Invite Member Modal */}
      <InviteMemberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddMember}
        name={newMemberName}
        setName={setNewMemberName}
        email={newMemberEmail}
        setEmail={setNewMemberEmail}
        role={newMemberRole}
        setRole={setNewMemberRole}
        department={newMemberDept}
        setDepartment={setNewMemberDept}
        isSubmitting={isSubmitting}
      />

    </div>
  );
};

export default Team;
