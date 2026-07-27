import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

export const Profile: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">User Profile</h1>
        <p className="text-slate-400 text-sm">Manage your personal account settings and preferences.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Full Name
          </label>
          <p className="text-slate-100 text-base font-medium">{user?.name || 'N/A'}</p>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Email Address
          </label>
          <p className="text-slate-100 text-base font-medium">{user?.email || 'N/A'}</p>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Role
          </label>
          <p className="text-slate-100 text-base font-medium capitalize">{user?.role || 'User'}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
