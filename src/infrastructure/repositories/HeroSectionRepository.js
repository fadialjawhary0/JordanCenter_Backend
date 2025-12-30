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
    const updateData = {};
    
    // Only include fields that are provided
    if (data.numberEn !== undefined) updateData.numberEn = data.numberEn;
    if (data.numberAr !== undefined) updateData.numberAr = data.numberAr;
    if (data.labelEn !== undefined) updateData.labelEn = data.labelEn;
    if (data.labelAr !== undefined) updateData.labelAr = data.labelAr;
    if (data.descriptionEn !== undefined) updateData.descriptionEn = data.descriptionEn;
    if (data.descriptionAr !== undefined) updateData.descriptionAr = data.descriptionAr;
    if (data.link !== undefined) updateData.link = data.link || null;
    if (data.buttonTextEn !== undefined) updateData.buttonTextEn = data.buttonTextEn || null;
    if (data.buttonTextAr !== undefined) updateData.buttonTextAr = data.buttonTextAr || null;
    if (data.order !== undefined) updateData.order = parseInt(data.order);
    
    return await prisma.heroStat.update({
      where: { id: statId },
      data: updateData,
    });
  }

  async deleteStat(statId) {
    return await prisma.heroStat.delete({
      where: { id: statId },
    });
  }
}

export default HeroSectionRepository;

