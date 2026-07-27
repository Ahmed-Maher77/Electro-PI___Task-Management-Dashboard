import React from 'react';
import { Link } from 'react-router-dom';

interface FooterLink {
  label: string;
  href?: string;
}

interface AuthFooterProps {
  promptText: string;
  linkText: string;
  linkTo: string;
  footerLinks?: FooterLink[];
}

// Reusable footer component for authentication pages
export const AuthFooter: React.FC<AuthFooterProps> = ({
  promptText,
  linkText,
  linkTo,
  footerLinks = [],
}) => {
  return (
    <div className="space-y-3 text-center">
      <p className="text-xs text-slate-600">
        {promptText}{' '}
        <Link to={linkTo} className="text-blue-600 font-semibold hover:underline">
          {linkText}
        </Link>
      </p>

      {footerLinks.length > 0 && (
        <div className="flex justify-center items-center gap-3 text-[11px] text-slate-400">
          {footerLinks.map((item, idx) => (
            <React.Fragment key={item.label}>
              <a
                href={item.href || '#'}
                onClick={(e) => e.preventDefault()}
                className="hover:text-slate-600"
              >
                {item.label}
              </a>
              {idx < footerLinks.length - 1 && <span>•</span>}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};
