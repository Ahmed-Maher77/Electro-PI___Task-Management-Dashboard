import React from 'react';
import { SupportCards } from '../components/support/SupportCards';
import { SupportForm } from '../components/support/SupportForm';
import { FaqAccordion } from '../components/support/FaqAccordion';

export const Support: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto text-right ">
      
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-900">مركز الدعم الفني والمساعدة</h1>
        <p className="text-xs text-slate-500 font-medium">
          نحن هنا لمساعدتك. تصفح الأسئلة الشائعة أو أرسل نموذج دعم فني مباشر للفريق.
        </p>
      </div>

      {/* Top Quick Card */}
      <SupportCards />

      {/* Support Form & FAQ Section */}
      <div className="space-y-8">
        <SupportForm />
        <FaqAccordion />
      </div>

    </div>
  );
};

export default Support;
