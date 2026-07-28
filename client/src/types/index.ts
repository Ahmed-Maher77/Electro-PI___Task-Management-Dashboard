import type React from 'react';

// ==========================================
// Core Domain Data Models
// ==========================================

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
  priority: 'low' | 'medium' | 'high' | 'urgent';
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

export interface TicketItem {
  id: string;
  subject: string;
  category: string;
  priority: string;
  date: string;
  status: 'قيد المراجعة' | 'تم الرد';
}

export interface ActivityItem {
  id: string;
  rawId: string;
  type: 'project' | 'task';
  title: string;
  subtitle: string;
  date: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export type SettingsTabType = 'profile' | 'notifications' | 'security';

// ==========================================
// API Response Formats
// ==========================================

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data: T;
}

export interface AuthResponse {
  user: User;
  token?: string;
}

// ==========================================
// Layout & Global Components Props
// ==========================================

export interface HeaderProps {
  onToggleMobileMenu?: () => void;
}

export interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  isMobileOpen: boolean;
  setIsMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface SidebarHeaderProps {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  isMobileOpen: boolean;
  setIsMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface SidebarNavProps {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  onNavClick: () => void;
}

export interface SidebarActionsProps {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  onNavClick: () => void;
}

// ==========================================
// Dashboard Component Props
// ==========================================

export interface StatCardsProps {
  isLoading: boolean;
  projectsCount: number;
  pendingTasksCount: number;
  highPriorityCount: number;
  completedTasksCount: number;
  completionRate: number;
  teamCount: number;
}

export interface RecentActivityProps {
  isLoading: boolean;
  projectsCount: number;
  activities: ActivityItem[];
}

export interface RecentTasksListProps {
  isLoading: boolean;
  tasks: Task[];
  onTaskStatusChange?: (taskId: string, newStatus: Task['status']) => void;
}

// ==========================================
// Projects Component Props
// ==========================================

export interface ProjectsFilterBarProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  leadFilter: string;
  setLeadFilter: (val: string) => void;
  uniqueLeads: string[];
}

export interface ProjectsTableProps {
  isLoading: boolean;
  projects: Project[];
  activeMenuId: string | null;
  setActiveMenuId: (id: string | null) => void;
  onEditProject: (project: Project) => void;
  onDeleteProject: (projectId: string) => void;
}

export interface ProjectVisibilityOptionsProps {
  status: 'in-progress' | 'critical' | 'on-hold' | 'completed';
  setStatus: (val: 'in-progress' | 'critical' | 'on-hold' | 'completed') => void;
  progress: number;
  setProgress: (val: number) => void;
}

export interface ProjectMembersInputProps {
  leadName: string;
  setLeadName: (val: string) => void;
}

export interface ProjectDetailsHeaderProps {
  project: Project | null;
  onEditProject: () => void;
}

export interface ProjectOverviewCardsProps {
  project: Project | null;
  onAddMemberClick: () => void;
  onManageMembersClick: () => void;
}

export interface ProjectTasksSectionProps {
  tasks: Task[];
  onTaskStatusChange: (taskId: string, status: Task['status']) => void;
  onDeleteTask: (taskId: string) => void;
  onCreateTask: (e: React.FormEvent) => void;
  isTaskModalOpen: boolean;
  setIsTaskModalOpen: (open: boolean) => void;
  newTaskTitle: string;
  setNewTaskTitle: (val: string) => void;
  newTaskDesc: string;
  setNewTaskDesc: (val: string) => void;
  newTaskAssignee: string;
  setNewTaskAssignee: (val: string) => void;
  newTaskStatus: 'todo' | 'doing' | 'review' | 'done';
  setNewTaskStatus: (val: 'todo' | 'doing' | 'review' | 'done') => void;
  newTaskPriority: 'low' | 'medium' | 'high';
  setNewTaskPriority: (val: 'low' | 'medium' | 'high') => void;
  isSubmittingTask: boolean;
}

// ==========================================
// Tasks Component Props
// ==========================================

export interface TasksFilterBarProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  priorityFilter: string;
  setPriorityFilter: (val: string) => void;
}

export interface TasksTableProps {
  isLoading: boolean;
  tasks: Task[];
  activeMenuId: string | null;
  setActiveMenuId: (id: string | null) => void;
  onTaskStatusChange: (taskId: string, newStatus: Task['status']) => void;
  onDeleteTask: (taskId: string) => void;
}

export interface TaskAttributesSidebarProps {
  status: 'todo' | 'doing' | 'review' | 'done';
  setStatus: (val: 'todo' | 'doing' | 'review' | 'done') => void;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  setPriority: (val: 'low' | 'medium' | 'high' | 'urgent') => void;
  assignee: string;
  setAssignee: (val: string) => void;
  dueDate: string;
  setDueDate: (val: string) => void;
  points: number;
  setPoints: (val: number) => void;
}

// ==========================================
// Team Component Props
// ==========================================

export interface TeamHeaderProps {
  onOpenInviteModal: () => void;
}

export interface TeamTableProps {
  isLoading: boolean;
  members: TeamMember[];
  activeMenuId: string | null;
  setActiveMenuId: (id: string | null) => void;
  onEditMemberRole: (member: TeamMember) => void;
  onDeleteMember: (id: string, name: string) => void;
}

export interface InviteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  name: string;
  setName: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  role: string;
  setRole: (val: string) => void;
  department: string;
  setDepartment: (val: string) => void;
  isSubmitting: boolean;
}

// ==========================================
// Profile & Settings Component Props
// ==========================================

export interface ProfileHeaderProps {
  userName: string;
  email: string;
  role: string;
  avatarUrl: string;
}

export interface ProfileInfoFormProps {
  name: string;
  setName: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  role: string;
  setRole: (val: string) => void;
  phone: string;
  setPhone: (val: string) => void;
  bio: string;
  setBio: (val: string) => void;
  avatarUrl: string;
  setAvatarUrl: (val: string) => void;
  isSaving: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export interface SettingsTabsProps {
  activeTab: SettingsTabType;
  setActiveTab: (tab: SettingsTabType) => void;
}

export interface UserProfileSettingsFormProps {
  name: string;
  setName: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  role: string;
  setRole: (val: string) => void;
  phone: string;
  setPhone: (val: string) => void;
  bio: string;
  setBio: (val: string) => void;
  avatarUrl: string;
  setAvatarUrl: (val: string) => void;
}

export interface NotificationSettingsFormProps {
  emailAlerts: boolean;
  setEmailAlerts: (val: boolean) => void;
  pushAlerts: boolean;
  setPushAlerts: (val: boolean) => void;
  taskAlerts: boolean;
  setTaskAlerts: (val: boolean) => void;
  weeklyDigest: boolean;
  setWeeklyDigest: (val: boolean) => void;
}
