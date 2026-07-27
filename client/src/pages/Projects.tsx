import React from 'react';
import { Link } from 'react-router-dom';

export const Projects: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
          <p className="text-slate-400 text-sm">Manage and track your active projects.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm">
          + New Project
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center text-slate-400">
        <p>No projects found. Create one to get started!</p>
        <Link to="/projects/sample-id" className="text-indigo-400 text-xs hover:underline mt-2 block">
          (View Sample Project Details)
        </Link>
      </div>
    </div>
  );
};

export default Projects;
