import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

const faqsData: FaqItem[] = [
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
    a: 'في صفحة "المشاريع"، يمكنك استخدام قائمة التصفية حسب الحالة واختيار "حرج" أو "قيد التنفيذ" لمتابعة التقدم ونسبة الإنجاز فورياً.',
  },
];

export const FaqAccordion: React.FC = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  return (
    <div className="space-y-4 text-xs pt-2">
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <HelpCircle className="w-5 h-5 text-blue-600" />
        <h2 className="text-base font-bold text-slate-900">الأسئلة الشائعة (FAQ)</h2>
      </div>

      <div className="divide-y divide-slate-200">
        {faqsData.map((faq, idx) => {
          const isOpen = expandedFaq === idx;
          return (
            <div key={idx} className="py-3.5">
              <button
                onClick={() => setExpandedFaq(isOpen ? null : idx)}
                className="w-full flex items-center justify-between font-bold text-slate-900 hover:text-blue-600 transition-colors text-right gap-2 text-xs sm:text-sm"
              >
                <span>{faq.q}</span>
                {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>
              {isOpen && (
                <p className="text-slate-600 mt-2 text-xs leading-relaxed pr-2 font-medium">
                  {faq.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
