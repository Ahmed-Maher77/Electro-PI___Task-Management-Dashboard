import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bold,
  Italic,
  List,
  Code,
  Calendar,
  User as UserIcon,
  Search,
  UploadCloud,
  Edit2,
} from 'lucide-react';
import { getProjectsApi } from '../api/projects.api';
import { createTaskApi } from '../api/tasks.api';
import type { Project } from '../types';

export const CreateTask: React.FC = () => {
  const navigate = useNavigate();

  // Projects dropdown state
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'todo' | 'doing' | 'review' | 'done'>('todo');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('high');
  const [assignee, setAssignee] = useState('سارة تشن');
  const [dueDate, setDueDate] = useState('2024-11-15');
  const [points, setPoints] = useState(5);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Load Projects to populate project select
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

  // Submit Handler
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
    <div className="space-y-6 max-w-6xl mx-auto text-right select-none">
      
      {/* Header */}
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

      {/* Main Grid: Form Left (Spans 2 cols) & Metadata Sidebar Right (Spans 1 col) */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Form Container (Spans 2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Main Card */}
          <div className="bg-white border border-slate-200 rounded-md p-6 space-y-5">
            
            {/* Project Select Dropdown */}
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

            {/* Title Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800">العنوان</label>
              <input
                type="text"
                required
                placeholder="ما الذي يجب إنجازه؟ (What needs to be done?)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-white text-slate-900 border border-slate-300 text-xs sm:text-sm rounded-md px-3.5 py-2.5 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
              />
            </div>

            {/* Description Field with Rich Toolbar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-800">الوصف</label>
                
                {/* Rich Text Controls */}
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

          {/* Form Actions */}
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

        {/* Right Task Settings Sidebar (Spans 1 col) */}
        <div className="space-y-6">
          
          {/* Attributes Card */}
          <div className="bg-white border border-slate-200 rounded-md p-5 space-y-5 text-xs">
            
            {/* Status Select */}
            <div className="space-y-1.5">
              <label className="block font-bold text-slate-800">الحالة</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-slate-800 focus:border-blue-600 focus:outline-none"
              >
                <option value="todo">قيد الانتظار (Todo)</option>
                <option value="doing">قيد العمل (Doing)</option>
                <option value="review">مراجعة (Review)</option>
                <option value="done">مكتملة (Done)</option>
              </select>
            </div>

            {/* Priority Button Selector */}
            <div className="space-y-1.5">
              <label className="block font-bold text-slate-800">الأولوية</label>
              <div className="grid grid-cols-2 gap-2">
                
                <button
                  type="button"
                  onClick={() => setPriority('low')}
                  className={`py-2 px-3 border rounded-md font-medium text-xs transition-colors flex items-center justify-center gap-1.5 ${
                    priority === 'low'
                      ? 'bg-blue-50 border-blue-600 text-blue-600'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  <span>منخفضة</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPriority('medium')}
                  className={`py-2 px-3 border rounded-md font-medium text-xs transition-colors flex items-center justify-center gap-1.5 ${
                    priority === 'medium'
                      ? 'bg-blue-50 border-blue-600 text-blue-600'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <span>متوسطة</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPriority('high')}
                  className={`py-2 px-3 border rounded-md font-medium text-xs transition-colors flex items-center justify-center gap-1.5 ${
                    priority === 'high'
                      ? 'bg-blue-50 border-blue-600 text-blue-600 font-bold'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <span>عالية</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPriority('urgent')}
                  className={`py-2 px-3 border rounded-md font-medium text-xs transition-colors flex items-center justify-center gap-1.5 ${
                    priority === 'urgent'
                      ? 'bg-red-50 border-red-600 text-red-600 font-bold'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                  <span>عاجلة</span>
                </button>

              </div>
            </div>

            {/* Assignee Input */}
            <div className="space-y-1.5">
              <label className="block font-bold text-slate-800">المسند إليه</label>
              <div className="relative">
                <input
                  type="text"
                  value={assignee}
                  onChange={(e) => setAssignee(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-md pr-9 pl-8 py-2 text-slate-800 focus:border-blue-600 focus:outline-none"
                />
                <UserIcon className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            {/* Due Date */}
            <div className="space-y-1.5">
              <label className="block font-bold text-slate-800">تاريخ الاستحقاق</label>
              <div className="relative">
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-slate-800 focus:border-blue-600 focus:outline-none"
                />
                <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Sprint & Points */}
            <div className="border-t border-slate-100 pt-4 space-y-2 text-slate-600">
              <div className="flex justify-between items-center">
                <span>الدورة (Sprint)</span>
                <span className="font-semibold text-slate-800">Sprint 24 - Hydra</span>
              </div>

              <div className="flex justify-between items-center">
                <span>النقاط (Points)</span>
                <div className="flex items-center gap-1 font-semibold text-slate-800">
                  <span>{points}</span>
                  <button
                    type="button"
                    onClick={() => setPoints(points === 5 ? 8 : 5)}
                    className="p-1 text-slate-400 hover:text-slate-700"
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* File Upload Dropzone Card */}
          <div className="bg-white border border-dashed border-slate-300 rounded-md p-6 text-center space-y-2 cursor-pointer hover:bg-slate-50/50 transition-colors">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 mx-auto flex items-center justify-center">
              <UploadCloud className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-slate-800">اسحب الملفات هنا أو انقر للرفع</p>
            <p className="text-[11px] text-slate-400">الحد الأقصى لحجم الملف 10 ميجابايت</p>
          </div>

        </div>

      </form>

    </div>
  );
};

export default CreateTask;
