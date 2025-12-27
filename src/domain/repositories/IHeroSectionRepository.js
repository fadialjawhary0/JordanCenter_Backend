/**
 * Hero Section Repository Interface
 * Defines the contract for hero section data access
 */
export class IHeroSectionRepository {
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

  async addMedia(heroSectionId, mediaData) {
    throw new Error('Method not implemented');
  }

  async updateMedia(mediaId, data) {
    throw new Error('Method not implemented');
  }

  async deleteMedia(mediaId) {
    throw new Error('Method not implemented');
  }

  async addStat(heroSectionId, statData) {
    throw new Error('Method not implemented');
  }

  async updateStat(statId, data) {
    throw new Error('Method not implemented');
  }

  async deleteStat(statId) {
    throw new Error('Method not implemented');
  }
}

