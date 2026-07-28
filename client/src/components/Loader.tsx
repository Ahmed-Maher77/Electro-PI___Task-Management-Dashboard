import React from 'react';

interface LoaderProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Simple Clean Spinner Component
 */
export const Spinner: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-8 h-8 border-2',
  };

  return (
    <div
      className={`inline-block rounded-full border-blue-600 border-t-transparent animate-spin ${sizeClasses[size]} ${className}`}
      role="status"
    />
  );
};

/**
 * Minimal Clean Page Loader
 */
export const Loader: React.FC<LoaderProps> = ({ message = 'جاري التحميل...' }) => {
  return (
    <div className="min-h-[300px] flex-1 flex flex-col items-center justify-center gap-3 p-6 text-center ">
      <Spinner size="lg" />
      <span className="text-xs font-semibold text-slate-600">{message}</span>
    </div>
  );
};

export default Loader;
