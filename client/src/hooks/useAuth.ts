import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { setUser, logout as logoutAction } from '../store/authSlice';
import type { User } from '../types';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth);

  return {
    user,
    isAuthenticated,
    isLoading,
    setUser: (u: User | null) => dispatch(setUser(u)),
    logout: () => dispatch(logoutAction()),
  };
};
