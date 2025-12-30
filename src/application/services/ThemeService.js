export class ThemeService {
  constructor(themeRepository) {
    this.themeRepository = themeRepository;
  }

  async getSettings() {
    return await this.themeRepository.getSettings();
  }

  async updateSettings(data) {
    return await this.themeRepository.updateSettings(data);
  }
}

export default ThemeService;

