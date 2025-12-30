import { PrismaClient } from '@prisma/client';
import { IProjectsPageRepository } from '../../domain/repositories/IProjectsPageRepository.js';

const prisma = new PrismaClient();

export class ProjectsPageRepository extends IProjectsPageRepository {
  async getSettings() {
    let settings = await prisma.projectsPageSettings.findFirst({
      where: { isActive: true },
      include: {
        heroButtons: {
          where: { isActive: true },
          orderBy: { order: 'asc' },
        },
      },
    });

    // Create default settings if none exist
    if (!settings) {
      settings = await prisma.projectsPageSettings.create({
        data: {
          heroTitleEn: 'Our Projects We Are Proud Of',
          heroTitleAr: 'مشاريعنا التي نفتخر بها',
          heroDescriptionEn: 'We offer a comprehensive range of services that make your project experience easier, faster, and more efficient from start to finish. Let\'s discuss your project\'s possibilities and provide you with the most suitable solution.',
          heroDescriptionAr: 'تقدم مجموعة شاملة من الخدمات التي تجعل تجربة مشروعك أسهل، أسرع، وأكثر كفاءة من البداية حتى التسليم. دعنا نناقش إمكانيات مشروعك ونقدم لك الحل الأنسب.',
          heroImageUrl: '/uploads/default-projects-hero.jpg',
          isActive: true,
        },
        include: {
          heroButtons: true,
        },
      });
    }

    return settings;
  }

  async updateSettings(data) {
    let settings = await prisma.projectsPageSettings.findFirst({
      where: { isActive: true },
    });

    if (settings) {
      return await prisma.projectsPageSettings.update({
        where: { id: settings.id },
        data: {
          heroTitleEn: data.heroTitleEn,
          heroTitleAr: data.heroTitleAr,
          heroDescriptionEn: data.heroDescriptionEn,
          heroDescriptionAr: data.heroDescriptionAr,
          heroImageUrl: data.heroImageUrl,
        },
        include: {
          heroButtons: {
            where: { isActive: true },
            orderBy: { order: 'asc' },
          },
        },
      });
    } else {
      return await prisma.projectsPageSettings.create({
        data: {
          ...data,
          isActive: true,
        },
        include: {
          heroButtons: true,
        },
      });
    }
  }

  async getAllHeroButtons() {
    return await prisma.projectHeroButton.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async getHeroButtonById(id) {
    return await prisma.projectHeroButton.findUnique({
      where: { id },
    });
  }

  async createHeroButton(data) {
    // Get or create projects page settings
    let settings = await prisma.projectsPageSettings.findFirst({
      where: { isActive: true },
    });

    if (!settings) {
      settings = await prisma.projectsPageSettings.create({
        data: {
          heroTitleEn: 'Our Projects We Are Proud Of',
          heroTitleAr: 'مشاريعنا التي نفتخر بها',
          heroDescriptionEn: 'We offer a comprehensive range of services that make your project experience easier, faster, and more efficient from start to finish.',
          heroDescriptionAr: 'تقدم مجموعة شاملة من الخدمات التي تجعل تجربة مشروعك أسهل، أسرع، وأكثر كفاءة من البداية حتى التسليم.',
          heroImageUrl: '/uploads/default-projects-hero.jpg',
          isActive: true,
        },
      });
    }

    return await prisma.projectHeroButton.create({
      data: {
        ...data,
        projectsPageSettingsId: settings.id,
        order: data.order ?? 0,
        isActive: data.isActive !== undefined ? data.isActive : true,
      },
    });
  }

  async updateHeroButton(id, data) {
    return await prisma.projectHeroButton.update({
      where: { id },
      data,
    });
  }

  async deleteHeroButton(id) {
    return await prisma.projectHeroButton.delete({
      where: { id },
    });
  }
}

export default ProjectsPageRepository;










