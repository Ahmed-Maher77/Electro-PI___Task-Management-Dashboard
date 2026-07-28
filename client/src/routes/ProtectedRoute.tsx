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
    // Perform initial session verification on mount
    if (isLoading) {
      getMeApi()
        .then((res) => dispatch(setUser(res.data.user)))
        .catch(() => dispatch(setUser(null)));
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
