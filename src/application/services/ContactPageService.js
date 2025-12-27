export class ContactPageService {
  constructor(contactPageRepository) {
    this.contactPageRepository = contactPageRepository;
  }

  async getSettings() {
    return await this.contactPageRepository.getSettings();
  }

  async updateSettings(data) {
    return await this.contactPageRepository.updateSettings(data);
  }
}

export default ContactPageService;
