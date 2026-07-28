import { Task } from '../models/Task.js';

export class TaskService {
  async getAllGlobalTasks() {
    return await Task.find().sort({ createdAt: -1 });
  }

  async getTasksByProject(projectId) {
    let tasks = await Task.find({ projectId }).sort({ createdAt: -1 });

    if (tasks.length === 0) {
      const sampleTasks = [
        {
          taskIdCode: 'TASK-1042',
          title: 'إضافة بوابة الدفع الإلكتروني',
          description: 'ربط سداد بطاقات المدى والائتمان المباشر',
          assigneeName: 'سارة محمود',
          status: 'doing',
          priority: 'high',
          dueDate: 'اليوم، 5:00 مساءً',
          projectId,
        },
        {
          taskIdCode: 'TASK-1045',
          title: 'تحسين تصميم القائمة الجانبية',
          description: 'جعلها سلسة ومناسبة لجميع أحجام الشاشات',
          assigneeName: 'أحمد ماهر',
          status: 'review',
          priority: 'medium',
          dueDate: '28 أكتوبر 2024',
          projectId,
        },
        {
          taskIdCode: 'TASK-1051',
          title: 'إصلاح مشكلة تسجيل الدخول',
          description: 'تحديث صلاحيات الجلسات وأمان الحسابات',
          assigneeName: 'محمد علي',
          status: 'todo',
          priority: 'low',
          dueDate: '02 نوفمبر 2024',
          projectId,
        },
        {
          taskIdCode: 'TASK-1039',
          title: 'مراجعة وتقليل حجم الملفات',
          description: 'تحسين أداء وسرعة تحميل الواجهة الأمامية',
          assigneeName: 'مريم حسن',
          status: 'done',
          priority: 'medium',
          dueDate: '19 أكتوبر 2024',
          projectId,
        },
        {
          taskIdCode: 'TASK-1060',
          title: 'إعداد سجلات الأنشطة',
          description: 'تتبع عمليات النظام وتحليل سجل الأداء',
          assigneeName: 'عمر خالد',
          status: 'doing',
          priority: 'high',
          dueDate: '05 نوفمبر 2024',
          projectId,
        },
        {
          taskIdCode: 'TASK-1065',
          title: 'تأمين الاتصالات المشفرة',
          description: 'تجديد شهادات الأمان SSL والتراخيص',
          assigneeName: 'سارة محمود',
          status: 'done',
          priority: 'medium',
          dueDate: '15 سبتمبر 2024',
          projectId,
        },
      ];

      tasks = await Task.insertMany(sampleTasks);
    }

    return tasks;
  }

  async createTask(projectId, data) {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const task = await Task.create({
      taskIdCode: `TASK-${randomNum}`,
      projectId,
      ...data,
    });
    return task;
  }

  async updateTask(taskId, data) {
    return await Task.findByIdAndUpdate(taskId, data, { new: true });
  }

  async deleteTask(taskId) {
    return await Task.findByIdAndDelete(taskId);
  }
}

export const taskService = new TaskService();
