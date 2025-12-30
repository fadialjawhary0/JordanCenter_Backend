export class NavbarService {
  constructor(navbarRepository) {
    this.navbarRepository = navbarRepository;
  }

  async getSettings() {
    return await this.navbarRepository.getSettings();
  }

  async updateSettings(data) {
    return await this.navbarRepository.updateSettings(data);
  }

  async getAllLinks() {
    return await this.navbarRepository.getAllLinks();
  }

  async getLinkById(id) {
    const link = await this.navbarRepository.getLinkById(id);
    if (!link) {
      throw new Error('Navbar link not found');
    }
    return link;
  }

  async createLink(data) {
    return await this.navbarRepository.createLink(data);
  }

  async updateLink(id, data) {
    const link = await this.navbarRepository.getLinkById(id);
    if (!link) {
      throw new Error('Navbar link not found');
    }
    return await this.navbarRepository.updateLink(id, data);
  }

  async deleteLink(id) {
    const link = await this.navbarRepository.getLinkById(id);
    if (!link) {
      throw new Error('Navbar link not found');
    }
    return await this.navbarRepository.deleteLink(id);
  }
}

export default NavbarService;

