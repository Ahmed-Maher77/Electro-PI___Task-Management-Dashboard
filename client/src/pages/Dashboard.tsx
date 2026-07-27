import React from 'react';

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">لوحة التحكم</h1>
        <p className="text-slate-500 text-xs mt-1">مرحباً بك! هنا ملخص مساحة العمل الخاصة بك.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-md p-5">
          <h3 className="text-slate-500 text-xs font-medium">إجمالي المشاريع</h3>
          <p className="text-2xl font-bold text-slate-900 mt-2">0</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-md p-5">
          <h3 className="text-slate-500 text-xs font-medium">المهام النشطة</h3>
          <p className="text-2xl font-bold text-slate-900 mt-2">0</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-md p-5">
          <h3 className="text-slate-500 text-xs font-medium">المهام مكتملة</h3>
          <p className="text-2xl font-bold text-slate-900 mt-2">0</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
