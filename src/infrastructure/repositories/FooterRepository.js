import { PrismaClient } from '@prisma/client';
import { IFooterRepository } from '../../domain/repositories/IFooterRepository.js';

const prisma = new PrismaClient();

export class FooterRepository extends IFooterRepository {
  async getSettings() {
    let settings = await prisma.footerSettings.findFirst({
      where: { isActive: true },
      include: {
        links: {
          where: { isActive: true },
          orderBy: [{ column: 'asc' }, { order: 'asc' }],
        },
        socialMedia: {
          where: { isActive: true },
          orderBy: { order: 'asc' },
        },
      },
    });

    // Create default settings if none exist
    if (!settings) {
      settings = await prisma.footerSettings.create({
        data: {
          column1TitleEn: 'Quick Links',
          column1TitleAr: 'روابط سريعة',
          column2TitleEn: 'Categories',
          column2TitleAr: 'الفئات',
          column3TitleEn: 'Our Services',
          column3TitleAr: 'خدماتنا',
          column4TitleEn: 'More',
          column4TitleAr: 'المزيد',
          followUsTitleEn: 'Follow Us On',
          followUsTitleAr: 'تابعنا على',
          newsletterTitleEn: 'Subscribe to Newsletter',
          newsletterTitleAr: 'اشترك في النشرة الإخبارية',
          newsletterEmailPlaceholderEn: 'Email',
          newsletterEmailPlaceholderAr: 'البريد الإلكتروني',
          newsletterButtonTextEn: 'Send',
          newsletterButtonTextAr: 'إرسال',
          copyrightTextEn: '© 2024 Central Jordan. All rights reserved.',
          copyrightTextAr: '© 2024 Central Jordan. جميع الحقوق محفوظة.',
          isActive: true,
        },
        include: {
          links: true,
          socialMedia: true,
        },
      });
    }

    return settings;
  }

  async updateSettings(data) {
    let settings = await prisma.footerSettings.findFirst({
      where: { isActive: true },
    });

    const updateData = {};
    if (data.column1TitleEn !== undefined) updateData.column1TitleEn = data.column1TitleEn;
    if (data.column1TitleAr !== undefined) updateData.column1TitleAr = data.column1TitleAr;
    if (data.column2TitleEn !== undefined) updateData.column2TitleEn = data.column2TitleEn;
    if (data.column2TitleAr !== undefined) updateData.column2TitleAr = data.column2TitleAr;
    if (data.column3TitleEn !== undefined) updateData.column3TitleEn = data.column3TitleEn;
    if (data.column3TitleAr !== undefined) updateData.column3TitleAr = data.column3TitleAr;
    if (data.column4TitleEn !== undefined) updateData.column4TitleEn = data.column4TitleEn;
    if (data.column4TitleAr !== undefined) updateData.column4TitleAr = data.column4TitleAr;
    if (data.followUsTitleEn !== undefined) updateData.followUsTitleEn = data.followUsTitleEn;
    if (data.followUsTitleAr !== undefined) updateData.followUsTitleAr = data.followUsTitleAr;
    if (data.newsletterTitleEn !== undefined) updateData.newsletterTitleEn = data.newsletterTitleEn;
    if (data.newsletterTitleAr !== undefined) updateData.newsletterTitleAr = data.newsletterTitleAr;
    if (data.newsletterEmailPlaceholderEn !== undefined) updateData.newsletterEmailPlaceholderEn = data.newsletterEmailPlaceholderEn;
    if (data.newsletterEmailPlaceholderAr !== undefined) updateData.newsletterEmailPlaceholderAr = data.newsletterEmailPlaceholderAr;
    if (data.newsletterButtonTextEn !== undefined) updateData.newsletterButtonTextEn = data.newsletterButtonTextEn;
    if (data.newsletterButtonTextAr !== undefined) updateData.newsletterButtonTextAr = data.newsletterButtonTextAr;
    if (data.copyrightTextEn !== undefined) updateData.copyrightTextEn = data.copyrightTextEn;
    if (data.copyrightTextAr !== undefined) updateData.copyrightTextAr = data.copyrightTextAr;

    if (settings) {
      return await prisma.footerSettings.update({
        where: { id: settings.id },
        data: updateData,
        include: {
          links: {
            where: { isActive: true },
            orderBy: [{ column: 'asc' }, { order: 'asc' }],
          },
          socialMedia: {
            where: { isActive: true },
            orderBy: { order: 'asc' },
          },
        },
      });
    } else {
      return await prisma.footerSettings.create({
        data: {
          column1TitleEn: data.column1TitleEn || 'Quick Links',
          column1TitleAr: data.column1TitleAr || 'روابط سريعة',
          column2TitleEn: data.column2TitleEn || 'Categories',
          column2TitleAr: data.column2TitleAr || 'الفئات',
          column3TitleEn: data.column3TitleEn || 'Our Services',
          column3TitleAr: data.column3TitleAr || 'خدماتنا',
          column4TitleEn: data.column4TitleEn || 'More',
          column4TitleAr: data.column4TitleAr || 'المزيد',
          followUsTitleEn: data.followUsTitleEn || 'Follow Us On',
          followUsTitleAr: data.followUsTitleAr || 'تابعنا على',
          newsletterTitleEn: data.newsletterTitleEn || 'Subscribe to Newsletter',
          newsletterTitleAr: data.newsletterTitleAr || 'اشترك في النشرة الإخبارية',
          newsletterEmailPlaceholderEn: data.newsletterEmailPlaceholderEn || 'Email',
          newsletterEmailPlaceholderAr: data.newsletterEmailPlaceholderAr || 'البريد الإلكتروني',
          newsletterButtonTextEn: data.newsletterButtonTextEn || 'Send',
          newsletterButtonTextAr: data.newsletterButtonTextAr || 'إرسال',
          copyrightTextEn: data.copyrightTextEn || '© 2024 Central Jordan. All rights reserved.',
          copyrightTextAr: data.copyrightTextAr || '© 2024 Central Jordan. جميع الحقوق محفوظة.',
          isActive: true,
        },
        include: {
          links: true,
          socialMedia: true,
        },
      });
    }
  }

  async getAllLinks() {
    return await prisma.footerLink.findMany({
      orderBy: [{ column: 'asc' }, { order: 'asc' }],
    });
  }

  async getLinkById(id) {
    return await prisma.footerLink.findUnique({
      where: { id },
    });
  }

  async createLink(data) {
    // Get or create footer settings
    let settings = await prisma.footerSettings.findFirst({
      where: { isActive: true },
    });

    if (!settings) {
      settings = await prisma.footerSettings.create({
        data: {
          column1TitleEn: 'Quick Links',
          column1TitleAr: 'روابط سريعة',
          column2TitleEn: 'Categories',
          column2TitleAr: 'الفئات',
          column3TitleEn: 'Our Services',
          column3TitleAr: 'خدماتنا',
          column4TitleEn: 'More',
          column4TitleAr: 'المزيد',
          followUsTitleEn: 'Follow Us On',
          followUsTitleAr: 'تابعنا على',
          newsletterTitleEn: 'Subscribe to Newsletter',
          newsletterTitleAr: 'اشترك في النشرة الإخبارية',
          newsletterEmailPlaceholderEn: 'Email',
          newsletterEmailPlaceholderAr: 'البريد الإلكتروني',
          newsletterButtonTextEn: 'Send',
          newsletterButtonTextAr: 'إرسال',
          copyrightTextEn: '© 2024 Central Jordan. All rights reserved.',
          copyrightTextAr: '© 2024 Central Jordan. جميع الحقوق محفوظة.',
          isActive: true,
        },
      });
    }

    return await prisma.footerLink.create({
      data: {
        ...data,
        footerSettingsId: settings.id,
        column: data.column ?? 1,
        order: data.order ?? 0,
        isActive: data.isActive !== undefined ? data.isActive : true,
      },
    });
  }

  async updateLink(id, data) {
    return await prisma.footerLink.update({
      where: { id },
      data,
    });
  }

  async deleteLink(id) {
    return await prisma.footerLink.delete({
      where: { id },
    });
  }

  async getAllSocialMedia() {
    return await prisma.socialMedia.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async getSocialMediaById(id) {
    return await prisma.socialMedia.findUnique({
      where: { id },
    });
  }

  async createSocialMedia(data) {
    // Get or create footer settings
    let settings = await prisma.footerSettings.findFirst({
      where: { isActive: true },
    });

    if (!settings) {
      settings = await prisma.footerSettings.create({
        data: {
          column1TitleEn: 'Quick Links',
          column1TitleAr: 'روابط سريعة',
          column2TitleEn: 'Categories',
          column2TitleAr: 'الفئات',
          column3TitleEn: 'Our Services',
          column3TitleAr: 'خدماتنا',
          column4TitleEn: 'More',
          column4TitleAr: 'المزيد',
          followUsTitleEn: 'Follow Us On',
          followUsTitleAr: 'تابعنا على',
          newsletterTitleEn: 'Subscribe to Newsletter',
          newsletterTitleAr: 'اشترك في النشرة الإخبارية',
          newsletterEmailPlaceholderEn: 'Email',
          newsletterEmailPlaceholderAr: 'البريد الإلكتروني',
          newsletterButtonTextEn: 'Send',
          newsletterButtonTextAr: 'إرسال',
          copyrightTextEn: '© 2024 Central Jordan. All rights reserved.',
          copyrightTextAr: '© 2024 Central Jordan. جميع الحقوق محفوظة.',
          isActive: true,
        },
      });
    }

    return await prisma.socialMedia.create({
      data: {
        ...data,
        footerSettingsId: settings.id,
        order: data.order ?? 0,
        isActive: data.isActive !== undefined ? data.isActive : true,
      },
    });
  }

  async updateSocialMedia(id, data) {
    return await prisma.socialMedia.update({
      where: { id },
      data,
    });
  }

  async deleteSocialMedia(id) {
    return await prisma.socialMedia.delete({
      where: { id },
    });
  }
}

export default FooterRepository;
