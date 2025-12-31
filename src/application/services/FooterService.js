export class FooterService {
  constructor(footerRepository) {
    this.footerRepository = footerRepository;
  }

  async getSettings() {
    return await this.footerRepository.getSettings();
  }

  async updateSettings(data) {
    return await this.footerRepository.updateSettings(data);
  }

  async getAllLinks() {
    return await this.footerRepository.getAllLinks();
  }

  async getLinkById(id) {
    return await this.footerRepository.getLinkById(id);
  }

  async createLink(data) {
    return await this.footerRepository.createLink(data);
  }

  async updateLink(id, data) {
    return await this.footerRepository.updateLink(id, data);
  }

  async deleteLink(id) {
    return await this.footerRepository.deleteLink(id);
  }

  async getAllSocialMedia() {
    return await this.footerRepository.getAllSocialMedia();
  }

  async getSocialMediaById(id) {
    return await this.footerRepository.getSocialMediaById(id);
  }

  async createSocialMedia(data) {
    return await this.footerRepository.createSocialMedia(data);
  }

  async updateSocialMedia(id, data) {
    return await this.footerRepository.updateSocialMedia(id, data);
  }

  async deleteSocialMedia(id) {
    return await this.footerRepository.deleteSocialMedia(id);
  }
}

export default FooterService;
