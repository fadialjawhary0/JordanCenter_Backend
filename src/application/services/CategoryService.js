export class CategoryService {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async getAllCategories() {
    return await this.categoryRepository.getAll();
  }

  async getActiveCategories() {
    return await this.categoryRepository.getActive();
  }

  async getCategoryById(id) {
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new Error('Category not found');
    }
    return category;
  }

  async createCategory(data) {
    return await this.categoryRepository.create(data);
  }

  async updateCategory(id, data) {
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new Error('Category not found');
    }
    return await this.categoryRepository.update(id, data);
  }

  async deleteCategory(id) {
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new Error('Category not found');
    }
    return await this.categoryRepository.delete(id);
  }
}

export default CategoryService;

