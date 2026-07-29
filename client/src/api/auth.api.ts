import api from './axios';
import type { ApiResponse, AuthResponse, User } from '../types';

export const registerApi = async (data: Record<string, any>): Promise<ApiResponse<AuthResponse>> => {
  const response = await api.post<ApiResponse<AuthResponse>>('/auth/register', data);
  if (response.data?.data?.token) {
    localStorage.setItem('auth_token', response.data.data.token);
  }
  return response.data;
};

export const loginApi = async (credentials: Record<string, any>): Promise<ApiResponse<AuthResponse>> => {
  const response = await api.post<ApiResponse<AuthResponse>>('/auth/login', credentials);
  if (response.data?.data?.token) {
    localStorage.setItem('auth_token', response.data.data.token);
  }
  return response.data;
};

export const getMeApi = async (): Promise<ApiResponse<{ user: User }>> => {
  const response = await api.get<ApiResponse<{ user: User }>>('/auth/me');
  return response.data;
};

export const updateProfileApi = async (data: { name: string; email: string }): Promise<ApiResponse<User>> => {
  const response = await api.put<ApiResponse<User>>('/auth/profile', data);
  return response.data;
};

export const updatePasswordApi = async (data: { currentPassword: string; newPassword: string }): Promise<ApiResponse<null>> => {
  const response = await api.put<ApiResponse<null>>('/auth/password', data);
  return response.data;
};

export const getAllUsersApi = async (): Promise<ApiResponse<any[]>> => {
  const response = await api.get<ApiResponse<any[]>>('/auth/users');
  return response.data;
};

export const deleteUserApi = async (id: string): Promise<ApiResponse<null>> => {
  const response = await api.delete<ApiResponse<null>>(`/auth/users/${id}`);
  return response.data;
};

export const logoutApi = async (): Promise<ApiResponse<null>> => {
  try {
    const response = await api.post<ApiResponse<null>>('/auth/logout');
    return response.data;
  } finally {
    localStorage.removeItem('auth_token');
  }
};
