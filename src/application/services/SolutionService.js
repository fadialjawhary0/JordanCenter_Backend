export class SolutionService {
  constructor(solutionRepository) {
    this.solutionRepository = solutionRepository;
  }

  async getAllSolutions() {
    return await this.solutionRepository.getAll();
  }

  async getActiveSolutions() {
    return await this.solutionRepository.getActive();
  }

  async getSolutionById(id) {
    const solution = await this.solutionRepository.findById(id);
    if (!solution) {
      throw new Error('Solution not found');
    }
    return solution;
  }

  async createSolution(data) {
    return await this.solutionRepository.create(data);
  }

  async updateSolution(id, data) {
    const solution = await this.solutionRepository.findById(id);
    if (!solution) {
      throw new Error('Solution not found');
    }
    return await this.solutionRepository.update(id, data);
  }

  async deleteSolution(id) {
    const solution = await this.solutionRepository.findById(id);
    if (!solution) {
      throw new Error('Solution not found');
    }
    return await this.solutionRepository.delete(id);
  }

  async getSectionSettings() {
    return await this.solutionRepository.getSectionSettings();
  }

  async updateSectionSettings(data) {
    return await this.solutionRepository.updateSectionSettings(data);
  }
}

export default SolutionService;
















