export interface User {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | string;
  department?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Project {
  id?: string;
  _id?: string;
  title: string;
  subtitle?: string;
  description?: string;
  ownerId?: string;
  leadName?: string;
  dueDate?: string;
  progress?: number;
  status: 'in-progress' | 'critical' | 'on-hold' | 'completed';
  createdAt?: string;
  updatedAt?: string;
}

export interface Task {
  id?: string;
  _id?: string;
  taskIdCode?: string;
  title: string;
  description?: string;
  assigneeName?: string;
  status: 'todo' | 'doing' | 'review' | 'done' | 'in-progress';
  priority: 'low' | 'medium' | 'high';
  projectId: string;
  assignedTo?: string;
  dueDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  roleBadge: string;
  department: string;
  projectsCount: number;
  status: 'active' | 'pending';
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data: T;
}

export interface AuthResponse {
  user: User;
  token?: string;
}
