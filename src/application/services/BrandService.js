export class BrandService {
  constructor(brandRepository) {
    this.brandRepository = brandRepository;
  }

  async getAllBrands() {
    return await this.brandRepository.getAll();
  }

  async getActiveBrands() {
    return await this.brandRepository.getActive();
  }

  async getBrandById(id) {
    const brand = await this.brandRepository.findById(id);
    if (!brand) {
      throw new Error('Brand not found');
    }
    return brand;
  }

  async createBrand(data) {
    return await this.brandRepository.create(data);
  }

  async updateBrand(id, data) {
    const brand = await this.brandRepository.findById(id);
    if (!brand) {
      throw new Error('Brand not found');
    }
    return await this.brandRepository.update(id, data);
  }

  async deleteBrand(id) {
    const brand = await this.brandRepository.findById(id);
    if (!brand) {
      throw new Error('Brand not found');
    }
    return await this.brandRepository.delete(id);
  }
}

export default BrandService;
