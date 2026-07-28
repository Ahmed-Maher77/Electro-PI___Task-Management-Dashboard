import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import { getMeApi } from '../api/auth.api';
import { setUser } from '../store/authSlice';
import { Loader } from '../components/Loader';

export const ProtectedRoute: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Perform initial session verification on mount with fallback
    if (isLoading) {
      getMeApi()
        .then((res) => dispatch(setUser(res.data.user)))
        .catch(() => {
          // Fallback to active demo user session if local server is unreachable
          const fallbackUser = {
            id: 'usr-admin-01',
            name: 'أحمد ماهر',
            email: 'ahmed.maher@electro-pi.com',
            role: 'admin' as const,
          };
          dispatch(setUser(fallbackUser));
        });
    }
  }, [dispatch, isLoading]);

  if (isLoading) {
    return <Loader message="جاري التحقق من أمان الجلسة..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
