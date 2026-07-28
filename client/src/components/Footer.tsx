import React from 'react';
import { ExternalLink, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 bg-white py-4 px-6 text-xs text-slate-500  flex flex-col sm:flex-row items-center justify-between gap-3 mt-auto">
      
      {/* Brand Copyright Notice */}
      <div className="flex items-center gap-1">
        <span className="font-bold text-slate-800">Electro-Pi</span>
        <span>© {new Date().getFullYear()} جميع الحقوق محفوظة.</span>
      </div>

      {/* Developer Credit & Portfolio Link */}
      <div className="flex items-center gap-1.5 font-medium">
        <span>تم التصميم والتطوير بواسطة</span>
        <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
        <a
          href="https://ahmedmaher-portfolio.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1 transition-colors dir-ltr"
        >
          <span>Ahmed Maher</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

    </footer>
  );
};

export default Footer;
