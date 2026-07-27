import React from 'react';
import { useParams, Link } from 'react-router-dom';

export const ProjectDetails: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-slate-400">
        <Link to="/projects" className="hover:text-slate-200">
          Projects
        </Link>
        <span>/</span>
        <span className="text-slate-200">{projectId}</span>
      </div>

      <div>
        <h1 className="text-2xl font-bold tracking-tight">Project Details: {projectId}</h1>
        <p className="text-slate-400 text-sm">View and manage tasks for this project.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Project Tasks</h3>
        <p className="text-slate-400 text-sm">No tasks assigned to this project yet.</p>
      </div>
    </div>
  );
};

export default ProjectDetails;
