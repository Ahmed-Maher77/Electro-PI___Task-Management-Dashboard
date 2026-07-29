import React from 'react';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { RefreshCw, Home, AlertOctagon } from 'lucide-react';

export const GlobalErrorBoundary: React.FC = () => {
  const error: any = useRouteError();

  const handleReload = () => {
    sessionStorage.removeItem('page_chunk_refreshed');
    window.location.reload();
  };

  const handleGoHome = () => {
    sessionStorage.removeItem('page_chunk_refreshed');
    window.location.href = '/dashboard';
  };

  let errorMessage = 'حدث خطأ غير متوقع في فتح هذه الصفحة.';
  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText || error.data?.message || errorMessage;
  } else if (error instanceof Error) {
    if (error.message.includes('Failed to fetch dynamically imported module')) {
      errorMessage = 'تم تحديث التطبيق إلى نسخة جديدة. يرجى إعادة تحميل الصفحة لتطبيق التحديثات.';
    } else {
      errorMessage = error.message;
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-right font-sans">
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm max-w-md w-full p-8 text-center space-y-6">
        
        <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto border border-red-100">
          <AlertOctagon className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-xl font-bold text-slate-900">تعذر تحميل الصفحة</h1>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            {errorMessage}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={handleReload}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-md text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>إعادة تحميل الصفحة</span>
          </button>
          
          <button
            onClick={handleGoHome}
            className="w-full sm:w-auto border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium px-5 py-2.5 rounded-md text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Home className="w-4 h-4 text-slate-500" />
            <span>العودة للرئيسية</span>
          </button>
        </div>

      </div>
    </div>
  );
};
