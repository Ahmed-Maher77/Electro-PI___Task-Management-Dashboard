import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-slate-100 text-center">
      <h1 className="text-6xl font-extrabold text-indigo-500 mb-2">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-slate-400 text-sm max-w-sm mb-6">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/dashboard"
        className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2.5 px-5 rounded-lg transition-colors text-sm"
      >
        Back to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
