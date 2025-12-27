export class HeroSectionService {
  constructor(heroSectionRepository) {
    this.heroSectionRepository = heroSectionRepository;
  }

  async getActiveHeroSection() {
    return await this.heroSectionRepository.getActive();
  }

  async getHeroSectionById(id) {
    const heroSection = await this.heroSectionRepository.findById(id);
    if (!heroSection) {
      throw new Error('Hero section not found');
    }
    return heroSection;
  }

  async createHeroSection(data) {
    return await this.heroSectionRepository.create(data);
  }

  async updateHeroSection(id, data) {
    const heroSection = await this.heroSectionRepository.findById(id);
    if (!heroSection) {
      throw new Error('Hero section not found');
    }
    return await this.heroSectionRepository.update(id, data);
  }

  async deleteHeroSection(id) {
    const heroSection = await this.heroSectionRepository.findById(id);
    if (!heroSection) {
      throw new Error('Hero section not found');
    }
    return await this.heroSectionRepository.delete(id);
  }

  async addMedia(heroSectionId, mediaData) {
    const heroSection = await this.heroSectionRepository.findById(heroSectionId);
    if (!heroSection) {
      throw new Error('Hero section not found');
    }
    return await this.heroSectionRepository.addMedia(heroSectionId, mediaData);
  }

  async updateMedia(mediaId, data) {
    return await this.heroSectionRepository.updateMedia(mediaId, data);
  }

  async deleteMedia(mediaId) {
    return await this.heroSectionRepository.deleteMedia(mediaId);
  }

  async addStat(heroSectionId, statData) {
    const heroSection = await this.heroSectionRepository.findById(heroSectionId);
    if (!heroSection) {
      throw new Error('Hero section not found');
    }
    return await this.heroSectionRepository.addStat(heroSectionId, statData);
  }

  async updateStat(statId, data) {
    return await this.heroSectionRepository.updateStat(statId, data);
  }

  async deleteStat(statId) {
    return await this.heroSectionRepository.deleteStat(statId);
  }
}

export default HeroSectionService;

