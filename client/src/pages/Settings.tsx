import React, { useState } from 'react';
import { Sliders, Bell, Shield, Check, Save } from 'lucide-react';

export const Settings: React.FC = () => {
  // General Settings State
  const [workspaceName, setWorkspaceName] = useState('Electro-Pi Enterprise');
  const [orgDomain, setOrgDomain] = useState('electro-pi.com');
  const [timezone, setTimezone] = useState('Africa/Cairo (GMT+03:00)');

  // Integrations State
  const [slackWebhook, setSlackWebhook] = useState('https://hooks.slack.com/services/T00/B00/XXXX');
  const [githubSync, setGithubSync] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);

  // Security Policy State
  const [sessionTimeout, setSessionTimeout] = useState('60');
  const [enforce2FA, setEnforce2FA] = useState(true);

  const [savedMsg, setSavedMsg] = useState('');

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedMsg('تم حفظ إعدادات مساحة العمل بنجاح');
    setTimeout(() => setSavedMsg(''), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto text-right select-none">
      
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-900">إعدادات المنظمة ومساحة العمل</h1>
        <p className="text-xs text-slate-500 font-medium">
          إدارة الإعدادات العامة للمنظمة، والتكاملات البرمجية، وتفضيلات النظام.
        </p>
      </div>

      {savedMsg && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-md flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{savedMsg}</span>
        </div>
      )}

      <form onSubmit={handleSaveSettings} className="space-y-6">
        
        {/* Card 1: General Settings */}
        <div className="bg-white border border-slate-200 rounded-md overflow-hidden">
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-blue-600" />
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              المعلومات العامة للمنظمة (GENERAL WORKSPACE)
            </h2>
          </div>

          <div className="p-6 space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block font-semibold text-slate-700">اسم مساحة العمل</label>
                <input
                  type="text"
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-md px-3.5 py-2.5 focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-semibold text-slate-700">النطاق المؤسسي (Domain)</label>
                <input
                  type="text"
                  value={orgDomain}
                  onChange={(e) => setOrgDomain(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-md px-3.5 py-2.5 focus:border-blue-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5 max-w-md">
              <label className="block font-semibold text-slate-700">المنطقة الزمنية</label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-md px-3.5 py-2.5 focus:border-blue-600 focus:outline-none"
              >
                <option value="Africa/Cairo (GMT+03:00)">أفريقيا / القاهرة (GMT+03:00)</option>
                <option value="Asia/Riyadh (GMT+03:00)">آسيا / الرياض (GMT+03:00)</option>
                <option value="Asia/Dubai (GMT+04:00)">آسيا / دبي (GMT+04:00)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Card 2: Notifications & Integrations */}
        <div className="bg-white border border-slate-200 rounded-md overflow-hidden">
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex items-center gap-2">
            <Bell className="w-4 h-4 text-blue-600" />
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              التكاملات والتنبيهات (INTEGRATIONS & ALERTS)
            </h2>
          </div>

          <div className="p-6 space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="block font-semibold text-slate-700">رابط إشعارات Slack Webhook URL</label>
              <input
                type="text"
                value={slackWebhook}
                onChange={(e) => setSlackWebhook(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-md px-3.5 py-2.5 focus:border-blue-600 focus:outline-none font-mono"
              />
            </div>

            <div className="space-y-3 pt-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={githubSync}
                  onChange={(e) => setGithubSync(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                />
                <div>
                  <span className="font-bold text-slate-800">تزامن مستودعات GitHub تلقائياً</span>
                  <p className="text-[11px] text-slate-500">مزامنة طلبيات السحب PRs والمهام ذات الصلة تلقائياً.</p>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                />
                <div>
                  <span className="font-bold text-slate-800">تنبيهات البريد الإلكتروني للمشاريع والمهام</span>
                  <p className="text-[11px] text-slate-500">إرسال تقارير يومية بالمهام المتأخرة والتحديثات.</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Card 3: Security & Access Policy */}
        <div className="bg-white border border-slate-200 rounded-md overflow-hidden">
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-600" />
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              الأمان وسياسة الوصول (SECURITY POLICY)
            </h2>
          </div>

          <div className="p-6 space-y-4 text-xs">
            <div className="space-y-1.5 max-w-xs">
              <label className="block font-semibold text-slate-700">مهلة انتهاء الجلسة تلقائياً</label>
              <select
                value={sessionTimeout}
                onChange={(e) => setSessionTimeout(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-md px-3.5 py-2.5 focus:border-blue-600 focus:outline-none"
              >
                <option value="30">30 دقيقة</option>
                <option value="60">60 دقيقة (ساعة واحدة)</option>
                <option value="120">120 دقيقة (ساعتان)</option>
              </select>
            </div>

            <label className="flex items-center gap-3 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={enforce2FA}
                onChange={(e) => setEnforce2FA(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              />
              <div>
                <span className="font-bold text-slate-800">فرض التحقق بخطوتين (2FA) على جميع الأعضاء</span>
                <p className="text-[11px] text-slate-500">الزم جميع أعضاء المنظمة بتفعيل 2FA للوصول للمشاريع.</p>
              </div>
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-md transition-colors text-xs flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>حفظ الإعدادات</span>
          </button>
        </div>

      </form>

    </div>
  );
};

export default Settings;
