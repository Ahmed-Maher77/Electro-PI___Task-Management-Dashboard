import React from 'react';

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-slate-400 text-sm">Welcome back! Here is a summary of your workspace.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-slate-400 text-sm font-medium">Total Projects</h3>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-slate-400 text-sm font-medium">Active Tasks</h3>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-slate-400 text-sm font-medium">Completed Tasks</h3>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
