import React from 'react';

interface ProjectVisibilityOptionsProps {
  isPublic: boolean;
  setIsPublic: (val: boolean) => void;
  enableAlerts: boolean;
  setEnableAlerts: (val: boolean) => void;
}

export const ProjectVisibilityOptions: React.FC<ProjectVisibilityOptionsProps> = ({
  isPublic,
  setIsPublic,
  enableAlerts,
  setEnableAlerts,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-100 pt-6 text-xs">
      <label className="border border-slate-200 rounded-md p-4 flex items-start gap-3 cursor-pointer hover:bg-slate-50/60 transition-colors">
        <input
          type="checkbox"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
          className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 mt-0.5"
        />
        <div>
          <p className="text-xs font-bold text-slate-900">عام داخل المنظمة</p>
          <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
            السماح لأي عضو في الفريق باكتشاف هذا المشروع والانضمام إليه.
          </p>
        </div>
      </label>

      <label className="border border-slate-200 rounded-md p-4 flex items-start gap-3 cursor-pointer hover:bg-slate-50/60 transition-colors">
        <input
          type="checkbox"
          checked={enableAlerts}
          onChange={(e) => setEnableAlerts(e.target.checked)}
          className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 mt-0.5"
        />
        <div>
          <p className="text-xs font-bold text-slate-900">تفعيل التنبيهات</p>
          <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
            إرسال إشعارات البريد الإلكتروني و Slack عند تحديث المهام.
          </p>
        </div>
      </label>
    </div>
  );
};
