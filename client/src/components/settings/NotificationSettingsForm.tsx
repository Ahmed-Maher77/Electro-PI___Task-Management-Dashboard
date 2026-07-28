import React from 'react';
import { Bell, Mail, Smartphone, ShieldCheck } from 'lucide-react';

interface NotificationSettingsFormProps {
  emailAlerts: boolean;
  setEmailAlerts: (val: boolean) => void;
  pushAlerts: boolean;
  setPushAlerts: (val: boolean) => void;
  taskAlerts: boolean;
  setTaskAlerts: (val: boolean) => void;
  weeklyDigest: boolean;
  setWeeklyDigest: (val: boolean) => void;
}

export const NotificationSettingsForm: React.FC<NotificationSettingsFormProps> = ({
  emailAlerts,
  setEmailAlerts,
  pushAlerts,
  setPushAlerts,
  taskAlerts,
  setTaskAlerts,
  weeklyDigest,
  setWeeklyDigest,
}) => {
  return (
    <div className="space-y-6 text-xs select-none">
      <div className="border-b border-slate-200 pb-3">
        <h2 className="text-sm font-bold text-slate-900">تفضيلات الإشعارات والتنبيهات</h2>
        <p className="text-[11px] text-slate-500 mt-0.5">
          تخصيص القنوات والرسائل التي ترغب بتلقيها أثناء متابعة المشاريع والمهام.
        </p>
      </div>

      <div className="space-y-4">
        {/* Email Alerts Toggle */}
        <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-md">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-slate-800">إشعارات البريد الإلكتروني</p>
              <p className="text-[11px] text-slate-500">تلقي التحديثات والرسائل الهامة مباشرة على بريدك</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setEmailAlerts(!emailAlerts)}
            className={`w-11 h-6 rounded-full transition-colors relative ${
              emailAlerts ? 'bg-blue-600' : 'bg-slate-300'
            }`}
          >
            <span
              className={`block w-4 h-4 bg-white rounded-full transition-transform absolute top-1 ${
                emailAlerts ? 'left-1' : 'right-1'
              }`}
            />
          </button>
        </div>

        {/* Push Notifications Toggle */}
        <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-md">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-slate-800">تنبيهات المتصفح الفورية</p>
              <p className="text-[11px] text-slate-500">عرض إشعارات سريعة أعلى المتصفح عند تغيير حالة مهمة</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setPushAlerts(!pushAlerts)}
            className={`w-11 h-6 rounded-full transition-colors relative ${
              pushAlerts ? 'bg-blue-600' : 'bg-slate-300'
            }`}
          >
            <span
              className={`block w-4 h-4 bg-white rounded-full transition-transform absolute top-1 ${
                pushAlerts ? 'left-1' : 'right-1'
              }`}
            />
          </button>
        </div>

        {/* Task Alerts Toggle */}
        <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-md">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-slate-800">تحديثات المهام المسندة</p>
              <p className="text-[11px] text-slate-500">إشعار فوري عند إسناد مهمة جديد أو الرد على التعليقات</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setTaskAlerts(!taskAlerts)}
            className={`w-11 h-6 rounded-full transition-colors relative ${
              taskAlerts ? 'bg-blue-600' : 'bg-slate-300'
            }`}
          >
            <span
              className={`block w-4 h-4 bg-white rounded-full transition-transform absolute top-1 ${
                taskAlerts ? 'left-1' : 'right-1'
              }`}
            />
          </button>
        </div>

        {/* Weekly Digest Toggle */}
        <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-md">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-slate-800">تقرير الإنجاز الأسبوعي</p>
              <p className="text-[11px] text-slate-500">ملخص إحصائي شاملاً بنسبة الإنجاز كل نهاية أسبوع</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setWeeklyDigest(!weeklyDigest)}
            className={`w-11 h-6 rounded-full transition-colors relative ${
              weeklyDigest ? 'bg-blue-600' : 'bg-slate-300'
            }`}
          >
            <span
              className={`block w-4 h-4 bg-white rounded-full transition-transform absolute top-1 ${
                weeklyDigest ? 'left-1' : 'right-1'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
