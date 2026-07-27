export class TaskService {
  async getTasksByProject(projectId) {
    return [];
  }

  async createTask(projectId, data) {
    return { id: 'task-stub-id', projectId, title: data.title, status: 'todo', priority: 'medium' };
  }

  async updateTask(taskId, data) {
    return { id: taskId, ...data };
  }

  async deleteTask(taskId) {
    return true;
  }
}

export const taskService = new TaskService();
