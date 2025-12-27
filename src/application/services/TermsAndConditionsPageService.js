export class TermsAndConditionsPageService {
  constructor(termsAndConditionsPageRepository) {
    this.termsAndConditionsPageRepository = termsAndConditionsPageRepository;
  }

  async getSettings() {
    return await this.termsAndConditionsPageRepository.getSettings();
  }

  async updateSettings(data) {
    return await this.termsAndConditionsPageRepository.updateSettings(data);
  }
}

export default TermsAndConditionsPageService;
