import { PrismaClient } from '@prisma/client';
import { IContactPageRepository } from '../../domain/repositories/IContactPageRepository.js';

const prisma = new PrismaClient();

export class ContactPageRepository extends IContactPageRepository {
  async getSettings() {
    let settings = await prisma.contactPageSettings.findFirst({
      where: { isActive: true },
    });

    // Create default settings if none exist
    if (!settings) {
      settings = await prisma.contactPageSettings.create({
        data: {
          heroImageUrl: '/uploads/default-contact-hero.jpg',
          titleEn: 'Get in Touch',
          titleAr: 'تواصل معنا',
          descriptionEn: 'We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.',
          descriptionAr: 'نود أن نسمع منك. أرسل لنا رسالة وسنرد في أقرب وقت ممكن.',
          phoneNumber: '+962 6 123 4567',
          email: 'info@centraljordan.com',
          workingHoursEn: 'Sunday - Thursday: 8:00 AM - 5:00 PM',
          workingHoursAr: 'الأحد - الخميس: 8:00 صباحاً - 5:00 مساءً',
          locationEn: 'Amman, Jordan',
          locationAr: 'عمان، الأردن',
          isActive: true,
        },
      });
    }

    return settings;
  }

  async updateSettings(data) {
    let settings = await prisma.contactPageSettings.findFirst({
      where: { isActive: true },
    });

    if (settings) {
      return await prisma.contactPageSettings.update({
        where: { id: settings.id },
        data,
      });
    } else {
      return await prisma.contactPageSettings.create({
        data: {
          ...data,
          isActive: true,
        },
      });
    }
  }
}

export default ContactPageRepository;
