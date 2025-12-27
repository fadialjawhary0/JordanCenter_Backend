/**
 * Product Repository Interface
 * Defines the contract for product data access
 */
export class IProductRepository {
  async getAll(filters = {}) {
    throw new Error('Method not implemented');
  }

  async getActive(filters = {}) {
    throw new Error('Method not implemented');
  }

  async findById(id) {
    throw new Error('Method not implemented');
  }

  async create(data) {
    throw new Error('Method not implemented');
  }

  async update(id, data) {
    throw new Error('Method not implemented');
  }

  async delete(id) {
    throw new Error('Method not implemented');
  }

  async getFilterOptions() {
    throw new Error('Method not implemented');
  }
}
