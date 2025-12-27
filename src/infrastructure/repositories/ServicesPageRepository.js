import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ServicesPageRepository {
  async getPageSettings() {
    let settings = await prisma.servicesPageSettings.findFirst({
      where: { isActive: true },
    });

    if (!settings) {
      // Create default settings if none exist
      settings = await prisma.servicesPageSettings.create({
        data: {
          heroTitleEn: 'Services',
          heroTitleAr: 'الخدمات',
          heroDescriptionEn: '',
          heroDescriptionAr: '',
          heroImageUrl: '',
          tickerTextEn: '',
          tickerTextAr: '',
          isActive: true,
        },
      });
    }

    return settings;
  }

  async updatePageSettings(data) {
    let settings = await prisma.servicesPageSettings.findFirst({
      where: { isActive: true },
    });

    const updateData = {};
    if (data.heroTitleEn !== undefined) updateData.heroTitleEn = data.heroTitleEn;
    if (data.heroTitleAr !== undefined) updateData.heroTitleAr = data.heroTitleAr;
    if (data.heroDescriptionEn !== undefined) updateData.heroDescriptionEn = data.heroDescriptionEn || null;
    if (data.heroDescriptionAr !== undefined) updateData.heroDescriptionAr = data.heroDescriptionAr || null;
    if (data.heroImageUrl !== undefined) updateData.heroImageUrl = data.heroImageUrl || null;
    if (data.tickerTextEn !== undefined) updateData.tickerTextEn = data.tickerTextEn || null;
    if (data.tickerTextAr !== undefined) updateData.tickerTextAr = data.tickerTextAr || null;

    if (settings) {
      return await prisma.servicesPageSettings.update({
        where: { id: settings.id },
        data: updateData,
      });
    } else {
      return await prisma.servicesPageSettings.create({
        data: {
          heroTitleEn: data.heroTitleEn || 'Services',
          heroTitleAr: data.heroTitleAr || 'الخدمات',
          heroDescriptionEn: data.heroDescriptionEn || '',
          heroDescriptionAr: data.heroDescriptionAr || '',
          heroImageUrl: data.heroImageUrl || '',
          tickerTextEn: data.tickerTextEn || '',
          tickerTextAr: data.tickerTextAr || '',
          isActive: true,
        },
      });
    }
  }
}

export default ServicesPageRepository;
