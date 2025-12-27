export class FAQPageService {
  constructor(faqPageRepository) {
    this.faqPageRepository = faqPageRepository;
  }

  async getSettings() {
    return await this.faqPageRepository.getSettings();
  }

  async updateSettings(data) {
    return await this.faqPageRepository.updateSettings(data);
  }

  async getAllFAQItems() {
    return await this.faqPageRepository.getAllFAQItems();
  }

  async getFAQItemById(id) {
    return await this.faqPageRepository.getFAQItemById(id);
  }

  async createFAQItem(data) {
    return await this.faqPageRepository.createFAQItem(data);
  }

  async updateFAQItem(id, data) {
    return await this.faqPageRepository.updateFAQItem(id, data);
  }

  async deleteFAQItem(id) {
    return await this.faqPageRepository.deleteFAQItem(id);
  }
}

export default FAQPageService;
