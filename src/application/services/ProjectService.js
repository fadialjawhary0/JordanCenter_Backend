export class ProjectService {
  constructor(projectRepository) {
    this.projectRepository = projectRepository;
  }

  async getActiveProjectsSection() {
    return await this.projectRepository.getActiveSection();
  }

  async getAllProjects() {
    return await this.projectRepository.getAllProjects();
  }

  async getActiveProjects() {
    return await this.projectRepository.getActiveProjects();
  }

  async getProjectById(id) {
    const project = await this.projectRepository.findProjectById(id);
    if (!project) {
      throw new Error('Project not found');
    }
    return project;
  }

  async createProject(data) {
    return await this.projectRepository.createProject(data);
  }

  async updateProject(id, data) {
    const project = await this.projectRepository.findProjectById(id);
    if (!project) {
      throw new Error('Project not found');
    }
    return await this.projectRepository.updateProject(id, data);
  }

  async deleteProject(id) {
    const project = await this.projectRepository.findProjectById(id);
    if (!project) {
      throw new Error('Project not found');
    }
    return await this.projectRepository.deleteProject(id);
  }

  async addProjectLogo(projectId, logoData) {
    const project = await this.projectRepository.findProjectById(projectId);
    if (!project) {
      throw new Error('Project not found');
    }
    return await this.projectRepository.addProjectLogo(projectId, logoData);
  }

  async updateProjectLogo(logoId, data) {
    return await this.projectRepository.updateProjectLogo(logoId, data);
  }

  async deleteProjectLogo(logoId) {
    return await this.projectRepository.deleteProjectLogo(logoId);
  }

  async createSectionSettings(data) {
    return await this.projectRepository.createSectionSettings(data);
  }

  async updateSectionSettings(id, data) {
    const section = await this.projectRepository.findSectionSettingsById(id);
    if (!section) {
      throw new Error('Projects section settings not found');
    }
    return await this.projectRepository.updateSectionSettings(id, data);
  }
}

export default ProjectService;

