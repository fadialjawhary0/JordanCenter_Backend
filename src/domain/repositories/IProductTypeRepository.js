export class IProductTypeRepository {
  async getAll() {
    throw new Error('Method getAll() must be implemented');
  }

  async getActive() {
    throw new Error('Method getActive() must be implemented');
  }

  async findById(id) {
    throw new Error('Method findById() must be implemented');
  }

  async create(data) {
    throw new Error('Method create() must be implemented');
  }

  async update(id, data) {
    throw new Error('Method update() must be implemented');
  }

  async delete(id) {
    throw new Error('Method delete() must be implemented');
  }
}

export default IProductTypeRepository;
