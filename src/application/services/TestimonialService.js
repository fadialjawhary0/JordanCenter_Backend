export class TestimonialService {
  constructor(testimonialRepository) {
    this.testimonialRepository = testimonialRepository;
  }

  async getAllTestimonials() {
    return await this.testimonialRepository.getAll();
  }

  async getActiveTestimonial() {
    return await this.testimonialRepository.getActive();
  }

  async getTestimonialById(id) {
    const testimonial = await this.testimonialRepository.findById(id);
    if (!testimonial) {
      throw new Error('Testimonial not found');
    }
    return testimonial;
  }

  async createTestimonial(data) {
    return await this.testimonialRepository.create(data);
  }

  async updateTestimonial(id, data) {
    const testimonial = await this.testimonialRepository.findById(id);
    if (!testimonial) {
      throw new Error('Testimonial not found');
    }
    return await this.testimonialRepository.update(id, data);
  }

  async deleteTestimonial(id) {
    const testimonial = await this.testimonialRepository.findById(id);
    if (!testimonial) {
      throw new Error('Testimonial not found');
    }
    return await this.testimonialRepository.delete(id);
  }

  async addProfile(testimonialId, profileData) {
    const testimonial = await this.testimonialRepository.findById(testimonialId);
    if (!testimonial) {
      throw new Error('Testimonial not found');
    }
    return await this.testimonialRepository.addProfile(testimonialId, profileData);
  }

  async updateProfile(profileId, profileData) {
    return await this.testimonialRepository.updateProfile(profileId, profileData);
  }

  async deleteProfile(profileId) {
    return await this.testimonialRepository.deleteProfile(profileId);
  }
}

export default TestimonialService;
