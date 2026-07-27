import { Project } from '../models/Project.js';

export class ProjectService {
  // Get all projects for current user (or seed initial projects matching screenshot if empty)
  async getAllProjects(userId) {
    let projects = await Project.find({ ownerId: userId }).sort({ createdAt: -1 });

    if (projects.length === 0) {
      const sampleProjects = [
        {
          title: 'Alpha-Centauri Pipeline',
          subtitle: 'Infrastructure Optimization',
          status: 'in-progress',
          leadName: 'إيلينا فانس (Elena Vance)',
          dueDate: '24 أكتوبر 2024',
          progress: 65,
          ownerId: userId,
        },
        {
          title: 'Kernel Security Patch',
          subtitle: 'Security Audit #402',
          status: 'critical',
          leadName: 'ماركوس ثورن (Marcus Thorne)',
          dueDate: '12 نوفمبر 2024',
          progress: 20,
          ownerId: userId,
        },
        {
          title: 'Cloud Migrator v2',
          subtitle: 'Data Pipeline Scalability',
          status: 'on-hold',
          leadName: 'جوليان درو (Julian Drue)',
          dueDate: '01 ديسمبر 2024',
          progress: 45,
          ownerId: userId,
        },
        {
          title: 'UI Refresh - Neptune',
          subtitle: 'Design System Integration',
          status: 'completed',
          leadName: 'سارة تشن (Sarah Chen)',
          dueDate: '30 سبتمبر 2024',
          progress: 100,
          ownerId: userId,
        },
        {
          title: 'Data Warehouse Expansion',
          subtitle: 'Storage Scaling Phase 2',
          status: 'in-progress',
          leadName: 'أليكس كومار (Alex Kumar)',
          dueDate: '15 يناير 2025',
          progress: 12,
          ownerId: userId,
        },
      ];
      projects = await Project.insertMany(sampleProjects);
    }

    return projects;
  }

  // Create new project
  async createProject(userId, data) {
    const project = await Project.create({
      ...data,
      ownerId: userId,
    });
    return project;
  }

  // Get project by ID
  async getProjectById(projectId) {
    return await Project.findById(projectId);
  }

  // Update project
  async updateProject(projectId, data) {
    return await Project.findByIdAndUpdate(projectId, data, { new: true });
  }

  // Delete project
  async deleteProject(projectId) {
    return await Project.findByIdAndDelete(projectId);
  }
}

export const projectService = new ProjectService();
