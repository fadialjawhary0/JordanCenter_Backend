export class StartProjectSectionService {
  constructor(startProjectSectionRepository) {
    this.startProjectSectionRepository = startProjectSectionRepository;
  }

  async getActive() {
    return await this.startProjectSectionRepository.getActive();
  }

  async getById(id) {
    const section = await this.startProjectSectionRepository.findById(id);
    if (!section) {
      throw new Error('Start Project Section not found');
    }
    return section;
  }

  async create(data) {
    return await this.startProjectSectionRepository.create(data);
  }

  async update(id, data) {
    const section = await this.startProjectSectionRepository.findById(id);
    if (!section) {
      throw new Error('Start Project Section not found');
    }
    return await this.startProjectSectionRepository.update(id, data);
  }

  async delete(id) {
    const section = await this.startProjectSectionRepository.findById(id);
    if (!section) {
      throw new Error('Start Project Section not found');
    }
    return await this.startProjectSectionRepository.delete(id);
  }
}

export default StartProjectSectionService;
