import { PrismaClient } from '@prisma/client';
import { ICategoriesSectionRepository } from '../../domain/repositories/ICategoriesSectionRepository.js';

const prisma = new PrismaClient();

export class CategoriesSectionRepository extends ICategoriesSectionRepository {
  async getSectionSettings() {
    let settings = await prisma.categoriesSectionSettings.findFirst({
      where: { isActive: true },
    });

    // Create default settings if none exist
    if (!settings) {
      settings = await prisma.categoriesSectionSettings.create({
        data: {
          sectionTitleEn: 'Product Categories',
          sectionTitleAr: 'فئات المنتجات',
          sectionSubtitleEn: 'Explore More',
          sectionSubtitleAr: 'استكشف المزيد',
          isActive: true,
        },
      });
    }

    return settings;
  }

  async updateSectionSettings(data) {
    let settings = await prisma.categoriesSectionSettings.findFirst({
      where: { isActive: true },
    });

    const updateData = {};
    if (data.sectionTitleEn !== undefined) updateData.sectionTitleEn = data.sectionTitleEn;
    if (data.sectionTitleAr !== undefined) updateData.sectionTitleAr = data.sectionTitleAr;
    if (data.sectionSubtitleEn !== undefined) updateData.sectionSubtitleEn = data.sectionSubtitleEn || null;
    if (data.sectionSubtitleAr !== undefined) updateData.sectionSubtitleAr = data.sectionSubtitleAr || null;

    if (settings) {
      return await prisma.categoriesSectionSettings.update({
        where: { id: settings.id },
        data: updateData,
      });
    } else {
      return await prisma.categoriesSectionSettings.create({
        data: {
          sectionTitleEn: data.sectionTitleEn || 'Product Categories',
          sectionTitleAr: data.sectionTitleAr || 'فئات المنتجات',
          sectionSubtitleEn: data.sectionSubtitleEn || 'Explore More',
          sectionSubtitleAr: data.sectionSubtitleAr || 'استكشف المزيد',
          isActive: true,
        },
      });
    }
  }
}

export default CategoriesSectionRepository;
