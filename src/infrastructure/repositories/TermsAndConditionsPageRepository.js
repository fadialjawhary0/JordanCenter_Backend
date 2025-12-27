import { PrismaClient } from '@prisma/client';
import { ITermsAndConditionsPageRepository } from '../../domain/repositories/ITermsAndConditionsPageRepository.js';

const prisma = new PrismaClient();

export class TermsAndConditionsPageRepository extends ITermsAndConditionsPageRepository {
  async getSettings() {
    let settings = await prisma.termsAndConditionsPageSettings.findFirst({
      where: { isActive: true },
    });

    // Create default settings if none exist
    if (!settings) {
      settings = await prisma.termsAndConditionsPageSettings.create({
        data: {
          heroImageUrl: '/uploads/default-terms-hero.jpg',
          titleEn: 'Terms and Conditions',
          titleAr: 'الشروط والأحكام',
          descriptionEn: 'Terms and conditions may be updated from time to time',
          descriptionAr: 'يمكن أن يتم تحديث الشروط والأحكام من فترة لأخرى',
          contentEn: '<p>Welcome to the Central Jordanian website. Please read these terms and conditions carefully before using the website.</p>',
          contentAr: '<p>مرحبا بكم في موقع المركزية الأردنية. يرجى قراءة هذه الشروط والقوانين بعناية قبل استخدام الموقع.</p>',
          isActive: true,
        },
      });
    }

    return settings;
  }

  async updateSettings(data) {
    let settings = await prisma.termsAndConditionsPageSettings.findFirst({
      where: { isActive: true },
    });

    if (settings) {
      return await prisma.termsAndConditionsPageSettings.update({
        where: { id: settings.id },
        data,
      });
    } else {
      return await prisma.termsAndConditionsPageSettings.create({
        data: {
          ...data,
          isActive: true,
        },
      });
    }
  }
}

export default TermsAndConditionsPageRepository;
