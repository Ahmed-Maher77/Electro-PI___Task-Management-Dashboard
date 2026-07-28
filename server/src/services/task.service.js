import { Task } from '../models/Task.js';

export class TaskService {
  // Get tasks by project (and seed initial sample tasks matching screenshot if empty)
  async getTasksByProject(projectId) {
    let tasks = await Task.find({ projectId }).sort({ createdAt: -1 });

    if (tasks.length === 0) {
      const sampleTasks = [
        {
          taskIdCode: 'TASK-1042',
          title: 'تعيين أدوار IAM لبيئة الاختبار (Provision IAM roles for staging)',
          description: 'ضمان الوصول المتبادل بين الحسابات لبيئة الاختبار والمراقبة',
          assigneeName: 'سارة تشن (Sarah Chen)',
          status: 'doing',
          priority: 'high',
          dueDate: 'اليوم، 5:00 مساءً',
          projectId,
        },
        {
          taskIdCode: 'TASK-1045',
          title: 'تحسين إعدادات موجه المرور (Optimize ingress controller configs)',
          description: 'تحديث سياسة إنهاء التشفير TLS والمهل الزمنية للاتصالات الحية',
          assigneeName: 'ماركوس ثورن (Marcus Thorne)',
          status: 'review',
          priority: 'medium',
          dueDate: '28 أكتوبر 2023',
          projectId,
        },
        {
          taskIdCode: 'TASK-1051',
          title: 'التحقق من طبقة استمرارية البيانات (Data persistence layer verification)',
          description: 'تشغيل اختبارات الأداء على الاستعادة التلقائية للتبديل RDS multi-AZ',
          assigneeName: 'غير مسند',
          status: 'todo',
          priority: 'low',
          dueDate: '02 نوفمبر 2023',
          projectId,
        },
        {
          taskIdCode: 'TASK-1039',
          title: 'تدقيق حجم حزمة الواجهة الأمامية (Frontend bundle size audit)',
          description: 'تحليل الأجزاء غير المستخدمة وتحسين تقسيم الكود',
          assigneeName: 'ديفيد كيم (David Kim)',
          status: 'done',
          priority: 'medium',
          dueDate: '19 أكتوبر 2023',
          projectId,
        },
      ];

      tasks = await Task.insertMany(sampleTasks);
    }

    return tasks;
  }

  // Create new task
  async createTask(projectId, data) {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const task = await Task.create({
      taskIdCode: `TASK-${randomNum}`,
      projectId,
      ...data,
    });
    return task;
  }

  // Update task
  async updateTask(taskId, data) {
    return await Task.findByIdAndUpdate(taskId, data, { new: true });
  }

  // Delete task
  async deleteTask(taskId) {
    return await Task.findByIdAndDelete(taskId);
  }
}

export const taskService = new TaskService();
