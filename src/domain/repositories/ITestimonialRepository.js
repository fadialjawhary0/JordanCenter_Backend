/**
 * Testimonial Repository Interface
 * Defines the contract for testimonial data access
 */
export class ITestimonialRepository {
  async getAll() {
    throw new Error('Method not implemented');
  }

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

  async addProfile(testimonialId, profileData) {
    throw new Error('Method not implemented');
  }

  async updateProfile(profileId, profileData) {
    throw new Error('Method not implemented');
  }

  async deleteProfile(profileId) {
    throw new Error('Method not implemented');
  }
}
