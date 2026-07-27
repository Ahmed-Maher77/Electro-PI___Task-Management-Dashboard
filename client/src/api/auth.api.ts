import api from './axios';
import type { ApiResponse, AuthResponse, User } from '../types';

export const registerApi = async (data: Record<string, any>): Promise<ApiResponse<AuthResponse>> => {
  const response = await api.post<ApiResponse<AuthResponse>>('/auth/register', data);
  return response.data;
};

export const loginApi = async (credentials: Record<string, any>): Promise<ApiResponse<AuthResponse>> => {
  const response = await api.post<ApiResponse<AuthResponse>>('/auth/login', credentials);
  return response.data;
};

export const getMeApi = async (): Promise<ApiResponse<{ user: User }>> => {
  const response = await api.get<ApiResponse<{ user: User }>>('/auth/me');
  return response.data;
};

export const logoutApi = async (): Promise<ApiResponse<null>> => {
  const response = await api.post<ApiResponse<null>>('/auth/logout');
  return response.data;
};
