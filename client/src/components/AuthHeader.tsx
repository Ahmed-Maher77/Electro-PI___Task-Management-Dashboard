import React from 'react';
import BrandLogo from './BrandLogo';

interface AuthHeaderProps {
  title?: string;
  subtitle: string;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({
  title = 'Electro-Pi',
  subtitle,
}) => {
  return (
    <div className="flex flex-col items-center space-y-2 text-center">
      <BrandLogo />
      <h1 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h1>
      <p className="text-xs text-slate-500 font-medium">{subtitle}</p>
    </div>
  );
};

export default AuthHeader;
