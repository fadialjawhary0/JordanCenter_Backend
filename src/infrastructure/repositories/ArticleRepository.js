import { PrismaClient } from '@prisma/client';
import { IArticleRepository } from '../../domain/repositories/IArticleRepository.js';

const prisma = new PrismaClient();

export class ArticleRepository extends IArticleRepository {
  async getAll() {
    return await prisma.article.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async getActive() {
    return await prisma.article.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
  }

  async findById(id) {
    return await prisma.article.findUnique({
      where: { id },
    });
  }

  async create(data) {
    return await prisma.article.create({
      data,
    });
  }

  async update(id, data) {
    return await prisma.article.update({
      where: { id },
      data,
    });
  }

  async delete(id) {
    return await prisma.article.delete({
      where: { id },
    });
  }

  async getSectionSettings() {
    let settings = await prisma.articlesSectionSettings.findFirst({
      where: { isActive: true },
    });

    // Create default settings if none exist
    if (!settings) {
      settings = await prisma.articlesSectionSettings.create({
        data: {
          sectionTitleEn: 'Learn to make better decisions',
          sectionTitleAr: 'تعلم اتخاذ قرارات أفضل',
          isActive: true,
        },
      });
    }

    return settings;
  }

  async updateSectionSettings(data) {
    let settings = await prisma.articlesSectionSettings.findFirst({
      where: { isActive: true },
    });

    const updateData = {};
    if (data.sectionTitleEn !== undefined) updateData.sectionTitleEn = data.sectionTitleEn;
    if (data.sectionTitleAr !== undefined) updateData.sectionTitleAr = data.sectionTitleAr;
    if (data.sectionSubtitleEn !== undefined) updateData.sectionSubtitleEn = data.sectionSubtitleEn || null;
    if (data.sectionSubtitleAr !== undefined) updateData.sectionSubtitleAr = data.sectionSubtitleAr || null;

    if (settings) {
      return await prisma.articlesSectionSettings.update({
        where: { id: settings.id },
        data: updateData,
      });
    } else {
      return await prisma.articlesSectionSettings.create({
        data: {
          sectionTitleEn: data.sectionTitleEn || 'Learn to make better decisions',
          sectionTitleAr: data.sectionTitleAr || 'تعلم اتخاذ قرارات أفضل',
          sectionSubtitleEn: data.sectionSubtitleEn || null,
          sectionSubtitleAr: data.sectionSubtitleAr || null,
          isActive: true,
        },
      });
    }
  }
}

export default ArticleRepository;
