import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, X, User as UserIcon } from 'lucide-react';
import { createProjectApi } from '../api/projects.api';

export const CreateProject: React.FC = () => {
  const navigate = useNavigate();

  // Form states
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

  // Add team member chip
  const handleAddMember = () => {
    if (!newMemberInput.trim()) return;
    if (!members.includes(newMemberInput.trim())) {
      setMembers([...members, newMemberInput.trim()]);
    }
    setNewMemberInput('');
  };

  // Remove team member chip
  const handleRemoveMember = (nameToRemove: string) => {
    setMembers(members.filter((m) => m !== nameToRemove));
  };

  // Submit handler
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
    } fontFinally: {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto text-right select-none">
      
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/projects" className="hover:text-slate-800 transition-colors">
          المشاريع
        </Link>
        <span>/</span>
        <span className="text-slate-800 font-semibold">إنشاء مشروع جديد</span>
      </div>

      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-xl font-bold text-slate-900">تكوين مشروع جديد</h1>
        <p className="text-xs text-slate-500 font-medium">
          حدد المعايير الأساسية ومستوى الرؤية وأعضاء الفريق لمساحة العمل الجديدة.
        </p>
      </div>

      {/* Main Form Card */}
      <div className="bg-white border border-slate-200 rounded-md p-8 space-y-6">
        
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Project Name */}
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
            <p className="text-[11px] text-slate-400">
              استخدم اسماً وصفياً يسهل على فريقك التعرف عليه.
            </p>
          </div>

          {/* Description */}
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

          {/* Team Members */}
          <div className="space-y-2 border-t border-slate-100 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-800">
                  أعضاء الفريق
                </label>
                <p className="text-[11px] text-slate-400">
                  سيكون للمستخدمين المحددين صلاحية القراءة والكتابة افتراضياً.
                </p>
              </div>
              
              <button
                type="button"
                onClick={handleAddMember}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1.5"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>إضافة عضو</span>
              </button>
            </div>

            {/* Chips Container */}
            <div className="border border-slate-300 rounded-md p-2.5 flex flex-wrap items-center gap-2 bg-white min-h-[44px]">
              {members.map((member) => (
                <div
                  key={member}
                  className="bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1.5"
                >
                  <UserIcon className="w-3 h-3 text-slate-500" />
                  <span>{member}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveMember(member)}
                    className="text-slate-400 hover:text-slate-700 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}

              <input
                type="text"
                placeholder="اكتب اسماً للإضافة..."
                value={newMemberInput}
                onChange={(e) => setNewMemberInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddMember();
                  }
                }}
                className="flex-1 min-w-[140px] bg-transparent text-xs text-slate-800 focus:outline-none px-1"
              />
            </div>
          </div>

          {/* Visibility Options Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-100 pt-6">
            
            {/* Option 1: Public within org */}
            <label className="border border-slate-200 rounded-md p-4 flex items-start gap-3 cursor-pointer hover:bg-slate-50/60 transition-colors">
              <input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 mt-0.5"
              />
              <div>
                <p className="text-xs font-bold text-slate-900">عام داخل المنظمة</p>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                  السماح لأي عضو في الفريق باكتشاف هذا المشروع والانضمام إليه.
                </p>
              </div>
            </label>

            {/* Option 2: Enable Alerts */}
            <label className="border border-slate-200 rounded-md p-4 flex items-start gap-3 cursor-pointer hover:bg-slate-50/60 transition-colors">
              <input
                type="checkbox"
                checked={enableAlerts}
                onChange={(e) => setEnableAlerts(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 mt-0.5"
              />
              <div>
                <p className="text-xs font-bold text-slate-900">تفعيل التنبيهات</p>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                  إرسال إشعارات البريد الإلكتروني و Slack عند تحديث المهام.
                </p>
              </div>
            </label>

          </div>

          {/* Actions */}
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
