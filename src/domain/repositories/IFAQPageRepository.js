export class IFAQPageRepository {
  async getSettings() {
    throw new Error('getSettings() must be implemented');
  }

  async updateSettings(data) {
    throw new Error('updateSettings() must be implemented');
  }

  async getAllFAQItems() {
    throw new Error('getAllFAQItems() must be implemented');
  }

  async getFAQItemById(id) {
    throw new Error('getFAQItemById() must be implemented');
  }

  async createFAQItem(data) {
    throw new Error('createFAQItem() must be implemented');
  }

  async updateFAQItem(id, data) {
    throw new Error('updateFAQItem() must be implemented');
  }

  async deleteFAQItem(id) {
    throw new Error('deleteFAQItem() must be implemented');
  }
}

export default IFAQPageRepository;
