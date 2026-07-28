import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

const faqsData: FaqItem[] = [
  {
    q: 'كيف يمكنني إضافة أعضاء جدد وتحديد أدوارهم في منصة Electro-Pi؟',
    a: 'يمكنك إضافة أعضاء جدد بالانتقال إلى صفحة "الفريق" والضغط على زر "دعوة عضو جديد". قم بملء الاسم والبريد الإلكتروني وتحديد الدور الوظيفي (Admin أو Developer)، وسيتم حفظ وتحديث بيانات العضو فورياً في قاعدة البيانات.',
  },
  {
    q: 'كيف تعمل مزامنة البيانات والمهام بين جميع أعضاء الفريق؟',
    a: 'تعتمد المنصة على خوادم Express المربوطة بقاعدة بيانات MongoDB بواسطة Mongoose، حيث يتم تحديث كافة الأنشطة والمشاريع والمهام وضمان انعكاس التغييرات لدى جميع الأعضاء بشكل دقيق.',
  },
  {
    q: 'كيف يمكنني إنشاء مشروع جديد ومتابعة نسبة الإنجاز والمسؤولين؟',
    a: 'عبر صفحة "المشاريع"، اضغط على زر "مشروع جديد"، أدخل عنوان المشروع وتاريخ الاستحقاق والمسؤول عن التنفيذ. يمكنك متابعة حالة المشروع (قيد التنفيذ، حرج، معلق، مكتمل) عبر شريط التقدم التفاعلي.',
  },
  {
    q: 'ما هي الخطوات المتبعة لتحديث بيانات الملف الشخصي والصورة الرمزية؟',
    a: 'في صفحة "إعدادات الملف الشخصي"، يمكنك رفع صورة شخصية جديدة وتغيير الاسم الكامل والبريد الإلكتروني والمسمى الوظيفي، وسيتم حفظ التعديلات في الجلسة والحساب مباشرة.',
  },
  {
    q: 'كيف يمكن تصفية المهام والمشاريع واستخدام شريط البحث السريع؟',
    a: 'توفر المنصة شريط بحث ذكي وفلاتر متقدمة في كافة الجداول، مما يتيح لك البحث بالاسم أو المعرف والتصفية حسب الحالة والأولوية المسندة بكل سهولة.',
  },
  {
    q: 'ما هي إجراءات الأمان المتبعة لحماية الحسابات وكلمات المرور؟',
    a: 'يتم تشفير كافة كلمات المرور باستخدام خوارزميات التشفير المتقدمة (Bcrypt). يمكنك تحديث كلمة المرور الخاصة بك وتأكيدها في أي وقت من خلال قسم الأمان بالحساب.',
  },
  {
    q: 'كيف يعكس نظام التصفح (Pagination) عدد البيانات الحقيقية؟',
    a: 'تعتمد المنصة على حساب ديناميكي لعناصر القوائم وعرض الصفحات الفعلية، حيث يمكنك التنقل بين الصفحات لمعاينة عدد العناصر المحدد في كل صفحة بشكل دقيق.',
  },
  {
    q: 'هل يدعم النظام التجاوب التام مع مختلف الأجهزة والشاشات؟',
    a: 'نعم، تم تصميم الواجهات باحترافية عالية لتدعم اتجاه اللغة العربية (RTL) والتجاوب مع جميع الشاشات سواء الهواتف الذكية، الأجهزة اللوحية، أو أجهزة الحواسيب المكتبية.',
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
                {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />}
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
