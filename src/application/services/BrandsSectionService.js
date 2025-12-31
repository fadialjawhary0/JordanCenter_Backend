export class BrandsSectionService {
  constructor(brandsSectionRepository) {
    this.brandsSectionRepository = brandsSectionRepository;
  }

  async getActiveBrandsSection() {
    return await this.brandsSectionRepository.getActive();
  }

  async getBrandsSectionById(id) {
    const brandsSection = await this.brandsSectionRepository.findById(id);
    if (!brandsSection) {
      throw new Error('Brands section not found');
    }
    return brandsSection;
  }

  async createBrandsSection(data) {
    return await this.brandsSectionRepository.create(data);
  }

  async updateBrandsSection(id, data) {
    const brandsSection = await this.brandsSectionRepository.findById(id);
    if (!brandsSection) {
      throw new Error('Brands section not found');
    }
    return await this.brandsSectionRepository.update(id, data);
  }

  async deleteBrandsSection(id) {
    const brandsSection = await this.brandsSectionRepository.findById(id);
    if (!brandsSection) {
      throw new Error('Brands section not found');
    }
    return await this.brandsSectionRepository.delete(id);
  }

  async addLogo(brandsSectionId, logoData) {
    const brandsSection = await this.brandsSectionRepository.findById(brandsSectionId);
    if (!brandsSection) {
      throw new Error('Brands section not found');
    }
    return await this.brandsSectionRepository.addLogo(brandsSectionId, logoData);
  }

  async updateLogo(logoId, data) {
    return await this.brandsSectionRepository.updateLogo(logoId, data);
  }

  async deleteLogo(logoId) {
    return await this.brandsSectionRepository.deleteLogo(logoId);
  }

  async getSectionSettings() {
    return await this.brandsSectionRepository.getSectionSettings();
  }

  async updateSectionSettings(data) {
    return await this.brandsSectionRepository.updateSectionSettings(data);
  }
}

export default BrandsSectionService;
