import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export const SupportForm: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('infrastructure');
  const [priority, setPriority] = useState('medium');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMsg, setSubmittedMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedMsg('تم إرسال نموذج الدعم الفني بنجاح! سيقوم فريق الدعم بالتواصل معك خلال ساعتين.');
      setSubject('');
      setMessage('');
    }, 800);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-md p-6 space-y-4">
      <div className="border-b border-slate-100 pb-3">
        <h2 className="text-sm font-bold text-slate-900">إرسال استفسار أو نموذج دعم فني</h2>
        <p className="text-[11px] text-slate-500 mt-0.5">أدخل تفاصيل الرسالة وسيقوم الفريق الفني بالرد المباشر.</p>
      </div>

      {submittedMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-md flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{submittedMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
        <div className="space-y-1">
          <label className="block font-bold text-slate-700">موضوع الاستفسار</label>
          <input
            type="text"
            required
            placeholder="مثال: استفسار حول صلاحيات المشاريع أو الربط البرمجي"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-md px-3.5 py-2.5 text-slate-900 focus:border-blue-600 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="block font-bold text-slate-700">فئة المشكلة</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-slate-800 focus:border-blue-600 focus:outline-none"
            >
              <option value="infrastructure">البنية التحتية</option>
              <option value="account">إعدادات الحساب</option>
              <option value="billing">الفواتير والاشتراك</option>
              <option value="other">أخرى</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="block font-bold text-slate-700">مستوى الأهمية</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-slate-800 focus:border-blue-600 focus:outline-none"
            >
              <option value="low">منخفضة</option>
              <option value="medium">متوسطة</option>
              <option value="high">عالية</option>
              <option value="urgent">عاجلة جداً</option>
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label className="block font-bold text-slate-700">تفاصيل الرسالة</label>
          <textarea
            rows={4}
            required
            placeholder="اشرح استفسارك بالتفصيل..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-md px-3.5 py-2.5 text-slate-900 focus:border-blue-600 focus:outline-none resize-none"
          />
        </div>

        <div className="flex justify-end pt-1">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium py-2.5 px-5 rounded-md transition-colors text-xs flex items-center gap-2"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isSubmitting ? 'جاري الإرسال...' : 'إرسال الرسالة'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
