export class ContactRequestService {
  constructor(contactRequestRepository) {
    this.contactRequestRepository = contactRequestRepository;
  }

  async getAllContactRequests() {
    return await this.contactRequestRepository.getAll();
  }

  async getContactRequestById(id) {
    const contactRequest = await this.contactRequestRepository.findById(id);
    if (!contactRequest) {
      throw new Error('Contact request not found');
    }
    return contactRequest;
  }

  async createContactRequest(data) {
    return await this.contactRequestRepository.create(data);
  }

  async updateContactRequest(id, data) {
    const contactRequest = await this.contactRequestRepository.findById(id);
    if (!contactRequest) {
      throw new Error('Contact request not found');
    }
    return await this.contactRequestRepository.update(id, data);
  }

  async deleteContactRequest(id) {
    const contactRequest = await this.contactRequestRepository.findById(id);
    if (!contactRequest) {
      throw new Error('Contact request not found');
    }
    return await this.contactRequestRepository.delete(id);
  }
}

export default ContactRequestService;
