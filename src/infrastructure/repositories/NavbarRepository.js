import { PrismaClient } from '@prisma/client';
import { INavbarRepository } from '../../domain/repositories/INavbarRepository.js';

const prisma = new PrismaClient();

export class NavbarRepository extends INavbarRepository {
  async getSettings() {
    let settings = await prisma.navbarSettings.findFirst({
      where: { isActive: true },
      include: {
        links: {
          where: { isActive: true },
          orderBy: { order: 'asc' },
        },
      },
    });

    // Create default settings if none exist
    if (!settings) {
      settings = await prisma.navbarSettings.create({
        data: {
          logoUrl: '/uploads/default-logo.svg',
          isActive: true,
        },
        include: {
          links: true,
        },
      });
    }

    return settings;
  }

  async updateSettings(data) {
    let settings = await prisma.navbarSettings.findFirst({
      where: { isActive: true },
    });

    if (settings) {
      return await prisma.navbarSettings.update({
        where: { id: settings.id },
        data: {
          logoUrl: data.logoUrl,
        },
        include: {
          links: {
            where: { isActive: true },
            orderBy: { order: 'asc' },
          },
        },
      });
    } else {
      return await prisma.navbarSettings.create({
        data: {
          logoUrl: data.logoUrl || '/uploads/default-logo.svg',
          isActive: true,
        },
        include: {
          links: true,
        },
      });
    }
  }

  async getAllLinks() {
    return await prisma.navbarLink.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async getLinkById(id) {
    return await prisma.navbarLink.findUnique({
      where: { id },
    });
  }

  async createLink(data) {
    // Get or create navbar settings
    let settings = await prisma.navbarSettings.findFirst({
      where: { isActive: true },
    });

    if (!settings) {
      settings = await prisma.navbarSettings.create({
        data: {
          logoUrl: '/uploads/default-logo.svg',
          isActive: true,
        },
      });
    }

    return await prisma.navbarLink.create({
      data: {
        ...data,
        navbarSettingsId: settings.id,
        order: data.order ?? 0,
        isActive: data.isActive !== undefined ? data.isActive : true,
      },
    });
  }

  async updateLink(id, data) {
    return await prisma.navbarLink.update({
      where: { id },
      data,
    });
  }

  async deleteLink(id) {
    return await prisma.navbarLink.delete({
      where: { id },
    });
  }
}

export default NavbarRepository;

