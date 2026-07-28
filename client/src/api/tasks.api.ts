import api from './axios';
import type { ApiResponse, Task } from '../types';

export const getAllTasksApi = async (): Promise<ApiResponse<Task[]>> => {
  const response = await api.get<ApiResponse<Task[]>>('/tasks');
  return response.data;
};

export const getTasksByProjectApi = async (projectId: string): Promise<ApiResponse<Task[]>> => {
  const response = await api.get<ApiResponse<Task[]>>(`/projects/${projectId}/tasks`);
  return response.data;
};

export const createTaskApi = async (projectId: string, data: Partial<Task>): Promise<ApiResponse<Task>> => {
  const response = await api.post<ApiResponse<Task>>(`/projects/${projectId}/tasks`, data);
  return response.data;
};

export const updateTaskApi = async (id: string, data: Partial<Task>): Promise<ApiResponse<Task>> => {
  const response = await api.patch<ApiResponse<Task>>(`/tasks/${id}`, data);
  return response.data;
};

export const deleteTaskApi = async (id: string): Promise<ApiResponse<null>> => {
  const response = await api.delete<ApiResponse<null>>(`/tasks/${id}`);
  return response.data;
};
