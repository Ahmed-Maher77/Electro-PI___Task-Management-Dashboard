import React, { useState } from 'react';
import { Send, CheckCircle2, Ticket } from 'lucide-react';

interface TicketItem {
  id: string;
  subject: string;
  category: string;
  priority: string;
  date: string;
  status: 'قيد المراجعة' | 'تم الرد';
}

export const SupportForm: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('infrastructure');
  const [priority, setPriority] = useState('medium');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMsg, setSubmittedMsg] = useState('');

  const [tickets, setTickets] = useState<TicketItem[]>([
    {
      id: 'TKT-9402',
      subject: 'طلب إضافة صلاحيات متقدمة لإدارة المشاريع',
      category: 'البنية التحتية',
      priority: 'عالية',
      date: 'اليوم، 2:30 مساءً',
      status: 'قيد المراجعة',
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);

      const newTicket: TicketItem = {
        id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
        subject: subject,
        category: category === 'infrastructure' ? 'البنية التحتية' : category === 'account' ? 'الحساب' : 'عام',
        priority: priority === 'urgent' ? 'عاجلة جداً' : priority === 'high' ? 'عالية' : 'متوسطة',
        date: 'الآن',
        status: 'قيد المراجعة',
      };

      setTickets([newTicket, ...tickets]);
      setSubmittedMsg('تم إرسال نموذج الدعم الفني بنجاح! سيقوم فريق الدعم بالتواصل معك خلال ساعتين.');
      setSubject('');
      setMessage('');
      setTimeout(() => setSubmittedMsg(''), 4000);
    }, 600);
  };

  return (
    <div className="space-y-6 text-xs select-none">
      
      {/* Ticket Form */}
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

      {/* Submitted Tickets History List */}
      {tickets.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-md p-6 space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Ticket className="w-4 h-4 text-blue-600" />
            <h3 className="font-bold text-slate-900 text-xs">تذاكر الدعم الفني السابقة</h3>
          </div>

          <div className="divide-y divide-slate-100">
            {tickets.map((t) => (
              <div key={t.id} className="py-2.5 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-slate-400 font-bold text-[10px]">{t.id}</span>
                    <span className="font-bold text-slate-800">{t.subject}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    الفئة: {t.category} • الأهمية: {t.priority} • {t.date}
                  </p>
                </div>

                <span className="px-2.5 py-0.5 bg-blue-50 border border-blue-200 text-blue-700 text-[10px] font-bold rounded">
                  {t.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
