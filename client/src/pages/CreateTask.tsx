import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bold, Italic, List, Code } from 'lucide-react';
import { getProjectsApi } from '../api/projects.api';
import { createTaskApi } from '../api/tasks.api';
import type { Project } from '../types';
import { TaskAttributesSidebar } from '../components/tasks/TaskAttributesSidebar';

export const CreateTask: React.FC = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'todo' | 'doing' | 'review' | 'done'>('todo');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('high');
  const [assignee, setAssignee] = useState('سارة تشن');
  const [dueDate, setDueDate] = useState('2024-11-15');
  const [points, setPoints] = useState(5);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getProjectsApi()
      .then((res) => {
        const list = res.data || [];
        setProjects(list);
        if (list.length > 0) {
          setSelectedProjectId(list[0]._id || list[0].id || '');
        }
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('يرجى إدخال عنوان المهمة');
      return;
    }

    if (!selectedProjectId) {
      setError('يرجى اختيار المشروع المنسوب إليه');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');

      await createTaskApi(selectedProjectId, {
        title: title.trim(),
        description: description.trim() || 'تفاصيل وخطوات التنفيذ المطلوبة...',
        status: status,
        priority: priority === 'urgent' ? 'high' : priority,
        assigneeName: assignee,
        dueDate: dueDate || 'اليوم، 5:00 مساءً',
      });

      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'فشل إنشاء المهمة، يرجى المحاولة مرة أخرى');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto text-right ">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-900">إنشاء مهمة جديدة</h1>
        <p className="text-xs text-slate-500 font-medium">
          حدد عناصر العمل وقم بإسنادها إلى أعضاء فريقك لمتابعة التنفيذ.
        </p>
      </div>

      {error && (
        <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-md p-6 space-y-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800">المشروع التابع له</label>
              <select
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-md px-3.5 py-2.5 text-xs text-slate-900 focus:border-blue-600 focus:outline-none"
              >
                {projects.map((p) => (
                  <option key={p._id || p.id} value={p._id || p.id}>
                    {p.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800">العنوان</label>
              <input
                type="text"
                required
                placeholder="ما الذي يجب إنجازه؟"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-white text-slate-900 border border-slate-300 text-xs sm:text-sm rounded-md px-3.5 py-2.5 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-800">الوصف</label>
                <div className="flex items-center gap-1 text-slate-500 border border-slate-200 rounded p-0.5 bg-slate-50">
                  <button type="button" className="p-1 hover:text-slate-900 rounded hover:bg-slate-200">
                    <Bold className="w-3.5 h-3.5" />
                  </button>
                  <button type="button" className="p-1 hover:text-slate-900 rounded hover:bg-slate-200">
                    <Italic className="w-3.5 h-3.5" />
                  </button>
                  <button type="button" className="p-1 hover:text-slate-900 rounded hover:bg-slate-200">
                    <List className="w-3.5 h-3.5" />
                  </button>
                  <button type="button" className="p-1 hover:text-slate-900 rounded hover:bg-slate-200">
                    <Code className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <textarea
                rows={6}
                placeholder="أضف التفاصيل، معايير القبول، أو السياق العام للمهمة..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-white text-slate-900 border border-slate-300 text-xs sm:text-sm rounded-md px-3.5 py-2.5 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors resize-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium py-2.5 px-6 rounded-md transition-colors text-xs"
            >
              {isSubmitting ? 'جاري إنشاء المهمة...' : 'إنشاء مهمة'}
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-5 py-2.5 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              إلغاء
            </button>
          </div>
        </div>

        <TaskAttributesSidebar
          status={status}
          setStatus={setStatus}
          priority={priority}
          setPriority={setPriority}
          assignee={assignee}
          setAssignee={setAssignee}
          dueDate={dueDate}
          setDueDate={setDueDate}
          points={points}
          setPoints={setPoints}
        />
      </form>
    </div>
  );
};

export default CreateTask;
