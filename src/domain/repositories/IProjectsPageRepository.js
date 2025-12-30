export class IProjectsPageRepository {
  async getSettings() {
    throw new Error('getSettings() must be implemented');
  }

  async updateSettings(data) {
    throw new Error('updateSettings() must be implemented');
  }

  async getAllHeroButtons() {
    throw new Error('getAllHeroButtons() must be implemented');
  }

  async getHeroButtonById(id) {
    throw new Error('getHeroButtonById() must be implemented');
  }

  async createHeroButton(data) {
    throw new Error('createHeroButton() must be implemented');
  }

  async updateHeroButton(id, data) {
    throw new Error('updateHeroButton() must be implemented');
  }

  async deleteHeroButton(id) {
    throw new Error('deleteHeroButton() must be implemented');
  }
}

export default IProjectsPageRepository;










