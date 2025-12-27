export class RequestTypeService {
  constructor(requestTypeRepository) {
    this.requestTypeRepository = requestTypeRepository;
  }

  async getAllRequestTypes() {
    return await this.requestTypeRepository.getAll();
  }

  async getActiveRequestTypes() {
    return await this.requestTypeRepository.getActive();
  }

  async getRequestTypeById(id) {
    const requestType = await this.requestTypeRepository.findById(id);
    if (!requestType) {
      throw new Error('Request type not found');
    }
    return requestType;
  }

  async createRequestType(data) {
    return await this.requestTypeRepository.create(data);
  }

  async updateRequestType(id, data) {
    const requestType = await this.requestTypeRepository.findById(id);
    if (!requestType) {
      throw new Error('Request type not found');
    }
    return await this.requestTypeRepository.update(id, data);
  }

  async deleteRequestType(id) {
    const requestType = await this.requestTypeRepository.findById(id);
    if (!requestType) {
      throw new Error('Request type not found');
    }
    return await this.requestTypeRepository.delete(id);
  }
}

export default RequestTypeService;
