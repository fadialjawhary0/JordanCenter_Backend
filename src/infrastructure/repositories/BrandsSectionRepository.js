import { PrismaClient } from '@prisma/client';
import { IBrandsSectionRepository } from '../../domain/repositories/IBrandsSectionRepository.js';

const prisma = new PrismaClient();

export class BrandsSectionRepository extends IBrandsSectionRepository {
  async getActive() {
    return await prisma.brandsSectionSettings.findFirst({
      where: { isActive: true },
      include: {
        logos: {
          where: { isActive: true },
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  async findById(id) {
    return await prisma.brandsSectionSettings.findUnique({
      where: { id },
      include: {
        logos: {
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  async create(data) {
    return await prisma.brandsSectionSettings.create({
      data,
      include: {
        logos: true,
      },
    });
  }

  async update(id, data) {
    return await prisma.brandsSectionSettings.update({
      where: { id },
      data,
      include: {
        logos: {
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  async delete(id) {
    return await prisma.brandsSectionSettings.delete({
      where: { id },
    });
  }

  async addLogo(brandsSectionId, logoData) {
    return await prisma.brandLogo.create({
      data: {
        ...logoData,
        brandsSectionId,
      },
    });
  }

  async updateLogo(logoId, data) {
    return await prisma.brandLogo.update({
      where: { id: logoId },
      data,
    });
  }

  async deleteLogo(logoId) {
    return await prisma.brandLogo.delete({
      where: { id: logoId },
    });
  }

  async getSectionSettings() {
    let settings = await prisma.brandsSectionSettings.findFirst({
      where: { isActive: true },
    });

    // Create default settings if none exist
    if (!settings) {
      settings = await prisma.brandsSectionSettings.create({
        data: {
          sectionTitleEn: 'The best global brands',
          sectionTitleAr: 'أفضل العلامات التجارية العالمية',
          sectionSubtitleEn: null,
          sectionSubtitleAr: null,
          isActive: true,
        },
      });
    }

    return settings;
  }

  async updateSectionSettings(data) {
    let settings = await prisma.brandsSectionSettings.findFirst({
      where: { isActive: true },
    });

    const updateData = {};
    if (data.sectionTitleEn !== undefined) updateData.sectionTitleEn = data.sectionTitleEn;
    if (data.sectionTitleAr !== undefined) updateData.sectionTitleAr = data.sectionTitleAr;
    if (data.sectionSubtitleEn !== undefined) updateData.sectionSubtitleEn = data.sectionSubtitleEn || null;
    if (data.sectionSubtitleAr !== undefined) updateData.sectionSubtitleAr = data.sectionSubtitleAr || null;

    if (settings) {
      return await prisma.brandsSectionSettings.update({
        where: { id: settings.id },
        data: updateData,
        include: {
          logos: {
            orderBy: { order: 'asc' },
          },
        },
      });
    } else {
      return await prisma.brandsSectionSettings.create({
        data: {
          sectionTitleEn: data.sectionTitleEn || 'The best global brands',
          sectionTitleAr: data.sectionTitleAr || 'أفضل العلامات التجارية العالمية',
          sectionSubtitleEn: data.sectionSubtitleEn || null,
          sectionSubtitleAr: data.sectionSubtitleAr || null,
          isActive: true,
        },
        include: {
          logos: true,
        },
      });
    }
  }
}

export default BrandsSectionRepository;
