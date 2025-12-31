import { PrismaClient } from '@prisma/client';
import { ISolutionRepository } from '../../domain/repositories/ISolutionRepository.js';

const prisma = new PrismaClient();

export class SolutionRepository extends ISolutionRepository {
  async getAll() {
    return await prisma.solution.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async getActive() {
    return await prisma.solution.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
  }

  async findById(id) {
    return await prisma.solution.findUnique({
      where: { id },
    });
  }

  async create(data) {
    return await prisma.solution.create({
      data,
    });
  }

  async update(id, data) {
    return await prisma.solution.update({
      where: { id },
      data,
    });
  }

  async delete(id) {
    return await prisma.solution.delete({
      where: { id },
    });
  }

  async getSectionSettings() {
    let settings = await prisma.solutionsSectionSettings.findFirst({
      where: { isActive: true },
    });

    // Create default settings if none exist
    if (!settings) {
      settings = await prisma.solutionsSectionSettings.create({
        data: {
          sectionTitleEn: 'Solutions that fit your needs',
          sectionTitleAr: 'حلول تناسب احتياجاتك',
          isActive: true,
        },
      });
    }

    return settings;
  }

  async updateSectionSettings(data) {
    let settings = await prisma.solutionsSectionSettings.findFirst({
      where: { isActive: true },
    });

    const updateData = {};
    if (data.sectionTitleEn !== undefined) updateData.sectionTitleEn = data.sectionTitleEn;
    if (data.sectionTitleAr !== undefined) updateData.sectionTitleAr = data.sectionTitleAr;
    if (data.sectionSubtitleEn !== undefined) updateData.sectionSubtitleEn = data.sectionSubtitleEn || null;
    if (data.sectionSubtitleAr !== undefined) updateData.sectionSubtitleAr = data.sectionSubtitleAr || null;

    if (settings) {
      return await prisma.solutionsSectionSettings.update({
        where: { id: settings.id },
        data: updateData,
      });
    } else {
      return await prisma.solutionsSectionSettings.create({
        data: {
          sectionTitleEn: data.sectionTitleEn || 'Solutions that fit your needs',
          sectionTitleAr: data.sectionTitleAr || 'حلول تناسب احتياجاتك',
          sectionSubtitleEn: data.sectionSubtitleEn || null,
          sectionSubtitleAr: data.sectionSubtitleAr || null,
          isActive: true,
        },
      });
    }
  }
}

export default SolutionRepository;
















