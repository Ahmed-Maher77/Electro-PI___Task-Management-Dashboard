import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HelpCircle,
  BookOpen,
  Ticket,
  Activity,
  ChevronDown,
  ChevronUp,
  Send,
  CheckCircle2,
} from 'lucide-react';

export const Support: React.FC = () => {
  const navigate = useNavigate();

  // Support Form State
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('infrastructure');
  const [priority, setPriority] = useState('medium');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMsg, setSubmittedMsg] = useState('');

  // Expanded FAQ state
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'كيف يمكنني إضافة أعضاء جدد لمساحة العمل الخاصة بي؟',
      a: 'يمكنك إضافة أعضاء جدد من خلال الانتقال إلى صفحة "الفريق" والضغط على زر "دعوة عضو جديد"، ثم إدخال البريد الإلكتروني وتحديد الصلاحيات المطلوبة.',
    },
    {
      q: 'كيف أقوم بتفعيل ربط إشعارات Slack والبريد الإلكتروني؟',
      a: 'من خلال صفحة "الإعدادات"، يمكنك تفعيل خيار إرسال التنبيهات وإضافة رابط Slack Webhook الخاص بقناتك لتلقي التحديثات فور حدوثها.',
    },
    {
      q: 'ما هي متطلبات أمان كلمة المرور وتفعيل التحقق بخطوتين (2FA)؟',
      a: 'تتطلب كلمة المرور 12 حرفاً على الأقل وتشتمل على رموز خاصة. يمكنك تفعيل 2FA بسهولة من صفحة "الملف الشخصي" تحت قسم الأمان والتحقق.',
    },
    {
      q: 'كيف يمكن تصفية ومتابعة المهام والمشاريع الحرجة؟',
      a: 'في صفحة "المشاريع"، يمكنك استخدام قائمة التصفية حسب الحالة وااختيار "حرج" أو "قيد التنفيذ" لمتابعة التقدم ونسبة الإنجاز فورياً.',
    },
  ];

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedMsg('تم إرسال تذكرة الدعم بنجاح! سيقوم فريق الدعم بالتواصل معك خلال ساعتين.');
      setSubject('');
      setMessage('');
    }, 1000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto text-right select-none">
      
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-900">مركز الدعم الفني والمساعدة</h1>
        <p className="text-xs text-slate-500 font-medium">
          نحن هنا لمساعدتك. تصفح الأسئلة الشائعة أو تواصل مع فريق الدعم الفني مباشرة.
        </p>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        
        <div
          onClick={() => navigate('/docs')}
          className="bg-white border border-slate-200 rounded-md p-5 space-y-2 hover:bg-slate-50/80 transition-colors cursor-pointer"
        >
          <div className="w-9 h-9 rounded bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">التوثيق الفني (Docs)</h3>
          <p className="text-slate-500 text-[11px] leading-relaxed">
            استعرض الأدلة الإرشادية وواجهات الاستخدام REST API الخاصة بمنصة Electro-Pi.
          </p>
        </div>

        <div
          onClick={() => alert('تم الانتقال إلى تذاكر الدعم')}
          className="bg-white border border-slate-200 rounded-md p-5 space-y-2 hover:bg-slate-50/80 transition-colors cursor-pointer"
        >
          <div className="w-9 h-9 rounded bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Ticket className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">تذاكر الدعم المفتوحة</h3>
          <p className="text-slate-500 text-[11px] leading-relaxed">
            تابع حالة التذاكر والاستفسارات التقنية السابقة التي تم تقديمها.
          </p>
        </div>

        <div
          onClick={() => navigate('/status')}
          className="bg-white border border-slate-200 rounded-md p-5 space-y-2 hover:bg-slate-50/80 transition-colors cursor-pointer"
        >
          <div className="w-9 h-9 rounded bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Activity className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">حالة الأنظمة الحية (Status)</h3>
          <p className="text-slate-500 text-[11px] leading-relaxed">
            جميع خوادم ومكونات النظام تعمل بكفاءة عالية بنسبة تشغيل 99.99%.
          </p>
        </div>

      </div>

      {/* Grid: FAQs Left & Ticket Form Right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* FAQs Accordion */}
        <div className="bg-white border border-slate-200 rounded-md p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <HelpCircle className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-bold text-slate-900">الأسئلة الشائعة (FAQ)</h2>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {faqs.map((faq, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <div key={idx} className="py-3">
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between font-bold text-slate-800 hover:text-blue-600 transition-colors text-right gap-2"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>
                  {isOpen && (
                    <p className="text-slate-600 mt-2 text-[11px] leading-relaxed pr-2 font-medium">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Support Ticket Form */}
        <div className="bg-white border border-slate-200 rounded-md p-6 space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900">فتح تذكرة دعم فني جديدة</h2>
            <p className="text-[11px] text-slate-500 mt-0.5">أرسل استفسارك وسيرد فريق الدعم الفني في أقرب وقت.</p>
          </div>

          {submittedMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-md flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{submittedMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmitTicket} className="space-y-3.5 text-xs">
            <div className="space-y-1">
              <label className="block font-bold text-slate-700">موضوع التذكرة</label>
              <input
                type="text"
                required
                placeholder="مثال: استفسار حول صلاحيات الفريق"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-md px-3.5 py-2.5 text-slate-900 focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
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
              <label className="block font-bold text-slate-700">تفاصيل المشكلة أو الاستفسار</label>
              <textarea
                rows={4}
                required
                placeholder="اشرح المشكلة بالتفصيل وملاحظاتك..."
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
                <span>{isSubmitting ? 'جاري الإرسال...' : 'إرسال تذكرة الدعم'}</span>
              </button>
            </div>
          </form>
        </div>

      </div>

    </div>
  );
};

export default Support;
