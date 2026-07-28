import React from 'react';
import { Terminal } from 'lucide-react';

interface LoaderProps {
  message?: string;
  submessage?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Professional Dual-Ring Spinner Icon
 */
export const Spinner: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-10 h-10 border-3',
  };

  return (
    <div
      className={`inline-block rounded-full border-blue-600 border-t-transparent animate-spin ${sizeClasses[size]} ${className}`}
      role="status"
    />
  );
};

/**
 * Full Page Branded Electro-Pi Professional Loader
 */
export const Loader: React.FC<LoaderProps> = ({
  message = 'جاري التحقق من الجلسة والبيانات...',
  submessage = 'يرجى الانتظار لحظات لحين تجهيز مساحة العمل',
}) => {
  return (
    <div className="fixed inset-0 bg-slate-50/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 text-center select-none">
      <div className="bg-white border border-slate-200 rounded-md p-8 max-w-sm w-full space-y-5">
        
        {/* Brand Icon Badge */}
        <div className="relative w-14 h-14 mx-auto">
          <div className="w-14 h-14 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-none">
            <Terminal className="w-7 h-7" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white border border-slate-200 rounded-full flex items-center justify-center">
            <Spinner size="sm" />
          </div>
        </div>

        {/* Text Details */}
        <div className="space-y-1">
          <h2 className="font-bold text-slate-900 text-base leading-tight">Electro-Pi</h2>
          <p className="text-xs font-bold text-blue-600">{message}</p>
          {submessage && <p className="text-[11px] text-slate-400 font-medium">{submessage}</p>}
        </div>

        {/* Animated Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
          <div className="bg-blue-600 h-full w-1/2 rounded-full animate-pulse transition-all duration-500" />
        </div>

      </div>
    </div>
  );
};

export default Loader;
