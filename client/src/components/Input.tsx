import React, { useState, forwardRef } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  topRightLabel?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, type = 'text', topRightLabel, className = '', ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordType = type === 'password';
    const inputType = isPasswordType ? (showPassword ? 'text' : 'password') : type;

    return (
      <div className="w-full space-y-1.5 text-right">
        {(label || topRightLabel) && (
          <div className="flex justify-between items-center text-xs sm:text-sm font-medium text-slate-700">
            <span>{label}</span>
            {topRightLabel && <div>{topRightLabel}</div>}
          </div>
        )}

        <div className="relative">
          <input
            ref={ref}
            type={inputType}
            className={`w-full bg-white text-slate-900 border text-sm rounded-md px-3.5 py-2.5 transition-colors focus:border-blue-600 focus:ring-1 focus:ring-blue-600 ${
              error ? 'border-red-500' : 'border-slate-300'
            } ${isPasswordType ? 'pl-10 pr-3.5' : ''} ${className}`}
            {...props}
          />

          {isPasswordType && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          )}
        </div>

        {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
