import { PrismaClient } from '@prisma/client';
import { IFAQPageRepository } from '../../domain/repositories/IFAQPageRepository.js';

const prisma = new PrismaClient();

export class FAQPageRepository extends IFAQPageRepository {
  async getSettings() {
    let settings = await prisma.fAQPageSettings.findFirst({
      where: { isActive: true },
      include: {
        faqItems: {
          where: { isActive: true },
          orderBy: { order: 'asc' },
        },
      },
    });

    // Create default settings if none exist
    if (!settings) {
      settings = await prisma.fAQPageSettings.create({
        data: {
          titleEn: 'Frequently Asked Questions',
          titleAr: 'الأسئلة الشائعة',
          descriptionEn: 'If you have any further inquiries, we are happy for you to contact us for a smoother experience.',
          descriptionAr: 'إذا كان لديك أي استفسار إضافي، يسعدنا تواصلك معنا لتجربة أكثر سلاسة.',
          isActive: true,
        },
        include: {
          faqItems: true,
        },
      });
    }

    return settings;
  }

  async updateSettings(data) {
    let settings = await prisma.fAQPageSettings.findFirst({
      where: { isActive: true },
    });

    if (settings) {
      return await prisma.fAQPageSettings.update({
        where: { id: settings.id },
        data: {
          titleEn: data.titleEn,
          titleAr: data.titleAr,
          descriptionEn: data.descriptionEn,
          descriptionAr: data.descriptionAr,
        },
        include: {
          faqItems: {
            where: { isActive: true },
            orderBy: { order: 'asc' },
          },
        },
      });
    } else {
      return await prisma.fAQPageSettings.create({
        data: {
          ...data,
          isActive: true,
        },
        include: {
          faqItems: true,
        },
      });
    }
  }

  async getAllFAQItems() {
    return await prisma.fAQItem.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async getFAQItemById(id) {
    return await prisma.fAQItem.findUnique({
      where: { id },
    });
  }

  async createFAQItem(data) {
    // Get or create FAQ page settings
    let settings = await prisma.fAQPageSettings.findFirst({
      where: { isActive: true },
    });

    if (!settings) {
      settings = await prisma.fAQPageSettings.create({
        data: {
          titleEn: 'Frequently Asked Questions',
          titleAr: 'الأسئلة الشائعة',
          descriptionEn: 'If you have any further inquiries, we are happy for you to contact us for a smoother experience.',
          descriptionAr: 'إذا كان لديك أي استفسار إضافي، يسعدنا تواصلك معنا لتجربة أكثر سلاسة.',
          isActive: true,
        },
      });
    }

    return await prisma.fAQItem.create({
      data: {
        ...data,
        faqPageSettingsId: settings.id,
        order: data.order ?? 0,
        isActive: data.isActive !== undefined ? data.isActive : true,
      },
    });
  }

  async updateFAQItem(id, data) {
    return await prisma.fAQItem.update({
      where: { id },
      data,
    });
  }

  async deleteFAQItem(id) {
    return await prisma.fAQItem.delete({
      where: { id },
    });
  }
}

export default FAQPageRepository;
