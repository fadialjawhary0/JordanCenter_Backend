export class INavbarRepository {
  async getSettings() {
    throw new Error('getSettings() must be implemented');
  }

  async updateSettings(data) {
    throw new Error('updateSettings() must be implemented');
  }

  async getAllLinks() {
    throw new Error('getAllLinks() must be implemented');
  }

  async getLinkById(id) {
    throw new Error('getLinkById() must be implemented');
  }

  async createLink(data) {
    throw new Error('createLink() must be implemented');
  }

  async updateLink(id, data) {
    throw new Error('updateLink() must be implemented');
  }

  async deleteLink(id) {
    throw new Error('deleteLink() must be implemented');
  }
}

export default INavbarRepository;

