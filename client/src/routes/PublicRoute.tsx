import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import { getMeApi } from '../api/auth.api';
import { setUser } from '../store/authSlice';

export const PublicRoute: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Check authentication status on mount if loading
    if (isLoading) {
      getMeApi()
        .then((res) => dispatch(setUser(res.data.user)))
        .catch(() => dispatch(setUser(null)));
    }
  }, [dispatch, isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex justify-center items-center text-sm font-medium text-slate-500">
        جاري التحميل...
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};
