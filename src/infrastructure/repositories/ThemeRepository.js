import { PrismaClient } from '@prisma/client';
import { IThemeRepository } from '../../domain/repositories/IThemeRepository.js';

const prisma = new PrismaClient();

export class ThemeRepository extends IThemeRepository {
  async getSettings() {
    let settings = await prisma.themeSettings.findFirst({
      where: { isActive: true },
    });

    // Create default settings if none exist
    if (!settings) {
      settings = await prisma.themeSettings.create({
        data: {
          colorBrand: '#3daae1',
          colorBrandDark: '#1c90ce',
          colorAccent: '#22c55e',
          colorDestructive: '#ef4444',
          colorWarning: '#f59e0b',
          colorInfo: '#3b82f6',
          colorRing: '#3daae1',
          fontFamily: 'Inter',
          fontFamilyAr: 'Tajawal',
          isActive: true,
        },
      });
    }

    return settings;
  }

  async updateSettings(data) {
    let settings = await prisma.themeSettings.findFirst({
      where: { isActive: true },
    });

    if (settings) {
      return await prisma.themeSettings.update({
        where: { id: settings.id },
        data: {
          colorBrand: data.colorBrand,
          colorBrandDark: data.colorBrandDark,
          colorAccent: data.colorAccent,
          colorDestructive: data.colorDestructive,
          colorWarning: data.colorWarning,
          colorInfo: data.colorInfo,
          colorRing: data.colorRing,
          fontFamily: data.fontFamily,
          fontFamilyAr: data.fontFamilyAr,
        },
      });
    } else {
      return await prisma.themeSettings.create({
        data: {
          colorBrand: data.colorBrand || '#3daae1',
          colorBrandDark: data.colorBrandDark || '#1c90ce',
          colorAccent: data.colorAccent || '#22c55e',
          colorDestructive: data.colorDestructive || '#ef4444',
          colorWarning: data.colorWarning || '#f59e0b',
          colorInfo: data.colorInfo || '#3b82f6',
          colorRing: data.colorRing || data.colorBrand || '#3daae1',
          fontFamily: data.fontFamily || 'Inter',
          fontFamilyAr: data.fontFamilyAr || 'Tajawal',
          isActive: true,
        },
      });
    }
  }
}

export default ThemeRepository;

