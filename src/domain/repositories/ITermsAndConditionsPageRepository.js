export class ITermsAndConditionsPageRepository {
  async getSettings() {
    throw new Error('getSettings() must be implemented');
  }

  async updateSettings(data) {
    throw new Error('updateSettings() must be implemented');
  }
}

export default ITermsAndConditionsPageRepository;
