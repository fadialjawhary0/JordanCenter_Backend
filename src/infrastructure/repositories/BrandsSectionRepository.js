import { PrismaClient } from '@prisma/client';
import { IBrandsSectionRepository } from '../../domain/repositories/IBrandsSectionRepository.js';

const prisma = new PrismaClient();

export class BrandsSectionRepository extends IBrandsSectionRepository {
  async getActive() {
    return await prisma.brandsSectionSettings.findFirst({
      where: { isActive: true },
      include: {
        logos: {
          where: { isActive: true },
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  async findById(id) {
    return await prisma.brandsSectionSettings.findUnique({
      where: { id },
      include: {
        logos: {
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  async create(data) {
    return await prisma.brandsSectionSettings.create({
      data,
      include: {
        logos: true,
      },
    });
  }

  async update(id, data) {
    return await prisma.brandsSectionSettings.update({
      where: { id },
      data,
      include: {
        logos: {
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  async delete(id) {
    return await prisma.brandsSectionSettings.delete({
      where: { id },
    });
  }

  async addLogo(brandsSectionId, logoData) {
    return await prisma.brandLogo.create({
      data: {
        ...logoData,
        brandsSectionId,
      },
    });
  }

  async updateLogo(logoId, data) {
    return await prisma.brandLogo.update({
      where: { id: logoId },
      data,
    });
  }

  async deleteLogo(logoId) {
    return await prisma.brandLogo.delete({
      where: { id: logoId },
    });
  }
}

export default BrandsSectionRepository;
