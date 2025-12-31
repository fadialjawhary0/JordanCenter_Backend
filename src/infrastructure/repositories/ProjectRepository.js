import { PrismaClient } from '@prisma/client';
import { IProjectRepository } from '../../domain/repositories/IProjectRepository.js';

const prisma = new PrismaClient();

export class ProjectRepository extends IProjectRepository {
  async getActiveSection() {
    return await prisma.projectsSectionSettings.findFirst({
      where: { isActive: true },
      include: {
        projects: {
          where: { isActive: true },
          include: {
            logos: {
              orderBy: { order: 'asc' },
            },
          },
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  async getAllProjects() {
    return await prisma.project.findMany({
      include: {
        logos: {
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { order: 'asc' },
    });
  }

  async getActiveProjects() {
    return await prisma.project.findMany({
      where: { isActive: true },
      include: {
        logos: {
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { order: 'asc' },
    });
  }

  async findProjectById(id) {
    return await prisma.project.findUnique({
      where: { id },
      include: {
        logos: {
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  async createProject(data) {
    return await prisma.project.create({
      data,
      include: {
        logos: true,
      },
    });
  }

  async updateProject(id, data) {
    return await prisma.project.update({
      where: { id },
      data,
      include: {
        logos: {
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  async deleteProject(id) {
    return await prisma.project.delete({
      where: { id },
    });
  }

  async addProjectLogo(projectId, logoData) {
    return await prisma.projectLogo.create({
      data: {
        ...logoData,
        projectId,
      },
    });
  }

  async updateProjectLogo(logoId, data) {
    return await prisma.projectLogo.update({
      where: { id: logoId },
      data,
    });
  }

  async deleteProjectLogo(logoId) {
    return await prisma.projectLogo.delete({
      where: { id: logoId },
    });
  }

  async updateSectionSettings(id, data) {
    const updateData = {};
    if (data.sectionTitleEn !== undefined) updateData.sectionTitleEn = data.sectionTitleEn;
    if (data.sectionTitleAr !== undefined) updateData.sectionTitleAr = data.sectionTitleAr;
    if (data.sectionSubtitleEn !== undefined) updateData.sectionSubtitleEn = data.sectionSubtitleEn || null;
    if (data.sectionSubtitleAr !== undefined) updateData.sectionSubtitleAr = data.sectionSubtitleAr || null;
    if (data.buttonTextEn !== undefined) updateData.buttonTextEn = data.buttonTextEn;
    if (data.buttonTextAr !== undefined) updateData.buttonTextAr = data.buttonTextAr;
    if (data.ctaButtonTextEn !== undefined) updateData.ctaButtonTextEn = data.ctaButtonTextEn;
    if (data.ctaButtonTextAr !== undefined) updateData.ctaButtonTextAr = data.ctaButtonTextAr;
    if (data.ctaButtonLink !== undefined) updateData.ctaButtonLink = data.ctaButtonLink || null;

    return await prisma.projectsSectionSettings.update({
      where: { id },
      data: updateData,
      include: {
        projects: {
          include: {
            logos: {
              orderBy: { order: 'asc' },
            },
          },
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  async findSectionSettingsById(id) {
    return await prisma.projectsSectionSettings.findUnique({
      where: { id },
      include: {
        projects: {
          include: {
            logos: {
              orderBy: { order: 'asc' },
            },
          },
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  async createSectionSettings(data) {
    return await prisma.projectsSectionSettings.create({
      data,
      include: {
        projects: true,
      },
    });
  }
}

export default ProjectRepository;

