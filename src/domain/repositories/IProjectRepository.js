/**
 * Project Repository Interface
 * Defines the contract for project data access
 */
export class IProjectRepository {
  async getActiveSection() {
    throw new Error('Method not implemented');
  }

  async getAllProjects() {
    throw new Error('Method not implemented');
  }

  async getActiveProjects() {
    throw new Error('Method not implemented');
  }

  async findProjectById(id) {
    throw new Error('Method not implemented');
  }

  async createProject(data) {
    throw new Error('Method not implemented');
  }

  async updateProject(id, data) {
    throw new Error('Method not implemented');
  }

  async deleteProject(id) {
    throw new Error('Method not implemented');
  }

  async addProjectLogo(projectId, logoData) {
    throw new Error('Method not implemented');
  }

  async updateProjectLogo(logoId, data) {
    throw new Error('Method not implemented');
  }

  async deleteProjectLogo(logoId) {
    throw new Error('Method not implemented');
  }
}

