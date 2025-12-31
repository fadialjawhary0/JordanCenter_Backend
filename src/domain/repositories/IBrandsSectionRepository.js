/**
 * Brands Section Repository Interface
 * Defines the contract for brands section data access
 */
export class IBrandsSectionRepository {
  async getActive() {
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

  async addLogo(brandsSectionId, logoData) {
    throw new Error('Method not implemented');
  }

  async updateLogo(logoId, data) {
    throw new Error('Method not implemented');
  }

  async deleteLogo(logoId) {
    throw new Error('Method not implemented');
  }

  async getSectionSettings() {
    throw new Error('Method not implemented');
  }

  async updateSectionSettings(data) {
    throw new Error('Method not implemented');
  }
}
