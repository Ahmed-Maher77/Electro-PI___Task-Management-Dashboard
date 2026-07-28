import React from 'react';
import { User, Bell, Lock } from 'lucide-react';

export type SettingsTabType = 'profile' | 'notifications' | 'security';

interface SettingsTabsProps {
  activeTab: SettingsTabType;
  setActiveTab: (tab: SettingsTabType) => void;
}

export const SettingsTabs: React.FC<SettingsTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex items-center gap-2 border-b border-slate-200 text-xs font-semibold select-none">
      <button
        onClick={() => setActiveTab('profile')}
        className={`pb-3 px-3 transition-colors flex items-center gap-1.5 relative ${
          activeTab === 'profile' ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <User className="w-3.5 h-3.5" />
        <span>الملف الشخصي</span>
        {activeTab === 'profile' && <span className="absolute bottom-0 right-0 left-0 h-0.5 bg-blue-600" />}
      </button>

      <button
        onClick={() => setActiveTab('notifications')}
        className={`pb-3 px-3 transition-colors flex items-center gap-1.5 relative ${
          activeTab === 'notifications' ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <Bell className="w-3.5 h-3.5" />
        <span>تفضلات الإشعارات</span>
        {activeTab === 'notifications' && <span className="absolute bottom-0 right-0 left-0 h-0.5 bg-blue-600" />}
      </button>

      <button
        onClick={() => setActiveTab('security')}
        className={`pb-3 px-3 transition-colors flex items-center gap-1.5 relative ${
          activeTab === 'security' ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <Lock className="w-3.5 h-3.5" />
        <span>الأمان وكلمة المرور</span>
        {activeTab === 'security' && <span className="absolute bottom-0 right-0 left-0 h-0.5 bg-blue-600" />}
      </button>
    </div>
  );
};
