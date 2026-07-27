import React from 'react';
import { Terminal } from 'lucide-react';

interface AuthHeaderProps {
  title?: string;
  subtitle: string;
}

// Reusable top header for auth pages with Electro-Pi branding
export const AuthHeader: React.FC<AuthHeaderProps> = ({
  title = 'Electro-Pi',
  subtitle,
}) => {
  return (
    <div className="flex flex-col items-center space-y-2 text-center">
      <div className="w-10 h-10 text-blue-600 flex items-center justify-center font-bold">
        <Terminal className="w-9 h-9" />
      </div>
      <h1 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h1>
      <p className="text-xs text-slate-500 font-medium">{subtitle}</p>
    </div>
  );
};
