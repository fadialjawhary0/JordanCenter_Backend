import { PrismaClient } from '@prisma/client';
import { IHeroSectionRepository } from '../../domain/repositories/IHeroSectionRepository.js';

const prisma = new PrismaClient();

export class HeroSectionRepository extends IHeroSectionRepository {
  async getActive() {
    return await prisma.heroSection.findFirst({
      where: { isActive: true },
      include: {
        mediaItems: {
          orderBy: { order: 'asc' },
        },
        stats: {
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  async findById(id) {
    return await prisma.heroSection.findUnique({
      where: { id },
      include: {
        mediaItems: {
          orderBy: { order: 'asc' },
        },
        stats: {
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  async create(data) {
    return await prisma.heroSection.create({
      data,
      include: {
        mediaItems: true,
        stats: true,
      },
    });
  }

  async update(id, data) {
    return await prisma.heroSection.update({
      where: { id },
      data,
      include: {
        mediaItems: true,
        stats: true,
      },
    });
  }

  async delete(id) {
    return await prisma.heroSection.delete({
      where: { id },
    });
  }

  async addMedia(heroSectionId, mediaData) {
    return await prisma.heroMedia.create({
      data: {
        ...mediaData,
        heroSectionId,
      },
    });
  }

  async updateMedia(mediaId, data) {
    return await prisma.heroMedia.update({
      where: { id: mediaId },
      data,
    });
  }

  async deleteMedia(mediaId) {
    return await prisma.heroMedia.delete({
      where: { id: mediaId },
    });
  }

  async addStat(heroSectionId, statData) {
    return await prisma.heroStat.create({
      data: {
        ...statData,
        heroSectionId,
      },
    });
  }

  async updateStat(statId, data) {
    return await prisma.heroStat.update({
      where: { id: statId },
      data,
    });
  }

  async deleteStat(statId) {
    return await prisma.heroStat.delete({
      where: { id: statId },
    });
  }
}

export default HeroSectionRepository;

