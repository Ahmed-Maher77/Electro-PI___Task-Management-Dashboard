import api from './axios';
import type { ApiResponse, User } from '../types';

export const getUsersApi = async (): Promise<ApiResponse<User[]>> => {
  const response = await api.get<ApiResponse<User[]>>('/users');
  return response.data;
};

export const getUserByIdApi = async (id: string): Promise<ApiResponse<User>> => {
  const response = await api.get<ApiResponse<User>>(`/users/${id}`);
  return response.data;
};
