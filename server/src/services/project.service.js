export class ProjectService {
  async getAllProjects(userId) {
    return [];
  }

  async createProject(userId, data) {
    return { id: 'project-stub-id', title: data.title, description: data.description, ownerId: userId, status: 'active' };
  }

  async getProjectById(projectId) {
    return { id: projectId, title: 'Sample Project', description: 'Sample Description', status: 'active' };
  }

  async updateProject(projectId, data) {
    return { id: projectId, ...data };
  }

  async deleteProject(projectId) {
    return true;
  }
}

export const projectService = new ProjectService();
