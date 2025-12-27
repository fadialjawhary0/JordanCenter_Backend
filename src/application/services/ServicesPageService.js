export class ServicesPageService {
  constructor(servicesPageRepository) {
    this.servicesPageRepository = servicesPageRepository;
  }

  async getPageSettings() {
    return await this.servicesPageRepository.getPageSettings();
  }

  async updatePageSettings(data) {
    return await this.servicesPageRepository.updatePageSettings(data);
  }
}

export default ServicesPageService;
