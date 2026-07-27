import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import { getMeApi } from '../api/auth.api';
import { setUser } from '../store/authSlice';

export const ProtectedRoute: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Perform initial session verification on mount
    if (isLoading) {
      getMeApi()
        .then((res) => dispatch(setUser(res.data.user)))
        .catch(() => dispatch(setUser(null)));
    }
  }, [dispatch, isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex justify-center items-center text-sm font-medium text-slate-500">
        جاري التحقق من الجلسة...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
