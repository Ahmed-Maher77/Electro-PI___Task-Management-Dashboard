import { Project } from '../models/Project.js';

export class ProjectService {
  // Get all projects for current user
  async getAllProjects(userId) {
    let projects = await Project.find({ ownerId: userId }).sort({ createdAt: -1 });

    if (projects.length === 0) {
      const sampleProjects = [
        {
          title: 'تطبيق المتجر الإلكتروني',
          subtitle: 'تطوير منصة البيع المباشر',
          status: 'in-progress',
          leadName: 'سارة محمود',
          dueDate: '24 أكتوبر 2024',
          progress: 65,
          ownerId: userId,
        },
        {
          title: 'نظام إدارة المبيعات',
          subtitle: 'متابعة الصفقات والعملاء',
          status: 'critical',
          leadName: 'أحمد ماهر',
          dueDate: '12 نوفمبر 2024',
          progress: 20,
          ownerId: userId,
        },
        {
          title: 'تصميم لوحة التحكم',
          subtitle: 'تحسين تجربة وواجهة المستخدم',
          status: 'on-hold',
          leadName: 'محمد علي',
          dueDate: '01 ديسمبر 2024',
          progress: 45,
          ownerId: userId,
        },
        {
          title: 'تطبيق الهواتف الذكية',
          subtitle: 'تنسيق واجهات iOS وأندرويد',
          status: 'completed',
          leadName: 'مريم حسن',
          dueDate: '30 سبتمبر 2024',
          progress: 100,
          ownerId: userId,
        },
        {
          title: 'تحديث البنية التحتية',
          subtitle: 'تحسين سرعة استجابة الخوادم',
          status: 'in-progress',
          leadName: 'عمر خالد',
          dueDate: '15 يناير 2025',
          progress: 12,
          ownerId: userId,
        },
      ];
      projects = await Project.insertMany(sampleProjects);
    }

    return projects;
  }

  async createProject(userId, data) {
    const project = await Project.create({
      ...data,
      ownerId: userId,
    });
    return project;
  }

  async getProjectById(projectId) {
    return await Project.findById(projectId);
  }

  async updateProject(projectId, data) {
    return await Project.findByIdAndUpdate(projectId, data, { new: true });
  }

  async deleteProject(projectId) {
    return await Project.findByIdAndDelete(projectId);
  }
}

export const projectService = new ProjectService();
