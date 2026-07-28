import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createProjectApi } from '../api/projects.api';
import { ProjectMembersInput } from '../components/projects/ProjectMembersInput';
import { ProjectVisibilityOptions } from '../components/projects/ProjectVisibilityOptions';

export const CreateProject: React.FC = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [members, setMembers] = useState<string[]>([
    'أليكس ريفيرا (قائد المشروع)',
    'سارة تشن',
    'ماركوس ثورن',
  ]);
  const [newMemberInput, setNewMemberInput] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [enableAlerts, setEnableAlerts] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleAddMember = () => {
    if (!newMemberInput.trim()) return;
    if (!members.includes(newMemberInput.trim())) {
      setMembers([...members, newMemberInput.trim()]);
    }
    setNewMemberInput('');
  };

  const handleRemoveMember = (nameToRemove: string) => {
    setMembers(members.filter((m) => m !== nameToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('اسم المشروع مطلوب');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');

      await createProjectApi({
        title: title.trim(),
        subtitle: description.trim() ? description.substring(0, 45) + '...' : 'تكامل الأنظمة والبنية التحتية',
        description: description.trim(),
        leadName: members[0] || 'أحمد محمود',
        dueDate: '31 ديسمبر 2024',
        status: 'in-progress',
        progress: 0,
      });

      navigate('/projects');
    } catch (err: any) {
      setError(err.message || 'فشل حفظ المشروع، يرجى المحاولة مرة أخرى');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto text-right ">
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/projects" className="hover:text-slate-800 transition-colors">
          المشاريع
        </Link>
        <span>/</span>
        <span className="text-slate-800 font-semibold">إنشاء مشروع جديد</span>
      </div>

      <div className="space-y-1">
        <h1 className="text-xl font-bold text-slate-900">تكوين مشروع جديد</h1>
        <p className="text-xs text-slate-500 font-medium">
          حدد المعايير الأساسية ومستوى الرؤية وأعضاء الفريق لمساحة العمل الجديدة.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-md p-8 space-y-6">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-bold text-slate-800">
              اسم المشروع
            </label>
            <input
              type="text"
              required
              placeholder="مثال: تحديث البنية التحتية Infrastructure Modernization"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-white text-slate-900 border border-slate-300 text-xs sm:text-sm rounded-md px-3.5 py-2.5 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-bold text-slate-800">
              وصف المشروع
            </label>
            <textarea
              rows={4}
              placeholder="حدد أهداف المشروع، المكدس التقني، والنتائج المتوقعة..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-white text-slate-900 border border-slate-300 text-xs sm:text-sm rounded-md px-3.5 py-2.5 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors resize-none"
            />
          </div>

          <ProjectMembersInput
            members={members}
            newMemberInput={newMemberInput}
            setNewMemberInput={setNewMemberInput}
            onAddMember={handleAddMember}
            onRemoveMember={handleRemoveMember}
          />

          <ProjectVisibilityOptions
            isPublic={isPublic}
            setIsPublic={setIsPublic}
            enableAlerts={enableAlerts}
            setEnableAlerts={setEnableAlerts}
          />

          <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
            <button
              type="button"
              onClick={() => navigate('/projects')}
              className="px-5 py-2.5 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              إلغاء
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium py-2.5 px-6 rounded-md transition-colors text-xs"
            >
              {isSubmitting ? 'جاري حفظ المشروع...' : 'حفظ المشروع'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
