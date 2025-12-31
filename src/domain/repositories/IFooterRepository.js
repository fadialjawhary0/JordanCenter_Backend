export class IFooterRepository {
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

  async getAllSocialMedia() {
    throw new Error('getAllSocialMedia() must be implemented');
  }

  async getSocialMediaById(id) {
    throw new Error('getSocialMediaById() must be implemented');
  }

  async createSocialMedia(data) {
    throw new Error('createSocialMedia() must be implemented');
  }

  async updateSocialMedia(id, data) {
    throw new Error('updateSocialMedia() must be implemented');
  }

  async deleteSocialMedia(id) {
    throw new Error('deleteSocialMedia() must be implemented');
  }
}

export default IFooterRepository;
