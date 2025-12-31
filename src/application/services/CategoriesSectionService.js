export class CategoriesSectionService {
  constructor(categoriesSectionRepository) {
    this.categoriesSectionRepository = categoriesSectionRepository;
  }

  async getSectionSettings() {
    return await this.categoriesSectionRepository.getSectionSettings();
  }

  async updateSectionSettings(data) {
    return await this.categoriesSectionRepository.updateSectionSettings(data);
  }
}

export default CategoriesSectionService;
