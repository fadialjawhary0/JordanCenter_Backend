export class ServiceService {
  constructor(serviceRepository) {
    this.serviceRepository = serviceRepository;
  }

  async getAllServices() {
    return await this.serviceRepository.getAll();
  }

  async getActiveServices() {
    return await this.serviceRepository.getActive();
  }

  async getServiceById(id) {
    const service = await this.serviceRepository.findById(id);
    if (!service) {
      throw new Error('Service not found');
    }
    return service;
  }

  async createService(data) {
    return await this.serviceRepository.create(data);
  }

  async updateService(id, data) {
    const service = await this.serviceRepository.findById(id);
    if (!service) {
      throw new Error('Service not found');
    }
    return await this.serviceRepository.update(id, data);
  }

  async deleteService(id) {
    const service = await this.serviceRepository.findById(id);
    if (!service) {
      throw new Error('Service not found');
    }
    return await this.serviceRepository.delete(id);
  }
}

export default ServiceService;

