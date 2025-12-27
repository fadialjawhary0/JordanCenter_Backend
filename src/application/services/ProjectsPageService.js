export class ProjectsPageService {
  constructor(projectsPageRepository) {
    this.projectsPageRepository = projectsPageRepository;
  }

  async getSettings() {
    return await this.projectsPageRepository.getSettings();
  }

  async updateSettings(data) {
    return await this.projectsPageRepository.updateSettings(data);
  }

  async getAllHeroButtons() {
    return await this.projectsPageRepository.getAllHeroButtons();
  }

  async getHeroButtonById(id) {
    return await this.projectsPageRepository.getHeroButtonById(id);
  }

  async createHeroButton(data) {
    return await this.projectsPageRepository.createHeroButton(data);
  }

  async updateHeroButton(id, data) {
    return await this.projectsPageRepository.updateHeroButton(id, data);
  }

  async deleteHeroButton(id) {
    return await this.projectsPageRepository.deleteHeroButton(id);
  }
}

export default ProjectsPageService;









