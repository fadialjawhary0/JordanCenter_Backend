export class ProductTypeService {
  constructor(productTypeRepository) {
    this.productTypeRepository = productTypeRepository;
  }

  async getAllProductTypes() {
    return await this.productTypeRepository.getAll();
  }

  async getActiveProductTypes() {
    return await this.productTypeRepository.getActive();
  }

  async getProductTypeById(id) {
    const productType = await this.productTypeRepository.findById(id);
    if (!productType) {
      throw new Error('Product type not found');
    }
    return productType;
  }

  async createProductType(data) {
    return await this.productTypeRepository.create(data);
  }

  async updateProductType(id, data) {
    const productType = await this.productTypeRepository.findById(id);
    if (!productType) {
      throw new Error('Product type not found');
    }
    return await this.productTypeRepository.update(id, data);
  }

  async deleteProductType(id) {
    const productType = await this.productTypeRepository.findById(id);
    if (!productType) {
      throw new Error('Product type not found');
    }
    return await this.productTypeRepository.delete(id);
  }
}

export default ProductTypeService;
