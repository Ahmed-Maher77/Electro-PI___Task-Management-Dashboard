import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-5xl font-extrabold text-blue-600 mb-2">404</h1>
      <h2 className="text-xl font-bold text-slate-900 mb-2">الصفحة غير موجودة</h2>
      <p className="text-slate-500 text-xs max-w-xs mb-6">
        الصفحة التي تحاول الوصول إليها غير موجودة أو تم نقلها.
      </p>
      <Link
        to="/dashboard"
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-md transition-colors text-xs"
      >
        العودة للوحة التحكم
      </Link>
    </div>
  );
};

export default NotFound;
