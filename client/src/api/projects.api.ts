import api from './axios';
import type { ApiResponse, Project } from '../types';

export const getProjectsApi = async (): Promise<ApiResponse<Project[]>> => {
  const response = await api.get<ApiResponse<Project[]>>('/projects');
  return response.data;
};

export const createProjectApi = async (data: Partial<Project>): Promise<ApiResponse<Project>> => {
  const response = await api.post<ApiResponse<Project>>('/projects', data);
  return response.data;
};

export const getProjectByIdApi = async (id: string): Promise<ApiResponse<Project>> => {
  const response = await api.get<ApiResponse<Project>>(`/projects/${id}`);
  return response.data;
};

export const updateProjectApi = async (id: string, data: Partial<Project>): Promise<ApiResponse<Project>> => {
  const response = await api.patch<ApiResponse<Project>>(`/projects/${id}`, data);
  return response.data;
};

export const deleteProjectApi = async (id: string): Promise<ApiResponse<null>> => {
  const response = await api.delete<ApiResponse<null>>(`/projects/${id}`);
  return response.data;
};
