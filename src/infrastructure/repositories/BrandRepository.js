import { PrismaClient } from '@prisma/client';
import { IBrandRepository } from '../../domain/repositories/IBrandRepository.js';

const prisma = new PrismaClient();

export class BrandRepository extends IBrandRepository {
  async getAll() {
    return await prisma.brand.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async getActive() {
    return await prisma.brand.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
  }

  async findById(id) {
    return await prisma.brand.findUnique({
      where: { id },
    });
  }

  async create(data) {
    return await prisma.brand.create({
      data: {
        name: data.name || data.nameEn || '',
        nameEn: data.nameEn,
        nameAr: data.nameAr,
        logoUrl: data.logoUrl || null,
        order: parseInt(data.order) || 0,
        isActive: data.isActive !== undefined ? data.isActive : true,
      },
    });
  }

  async update(id, data) {
    const updateData = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.nameEn !== undefined) updateData.nameEn = data.nameEn;
    if (data.nameAr !== undefined) updateData.nameAr = data.nameAr;
    if (data.logoUrl !== undefined) updateData.logoUrl = data.logoUrl || null;
    if (data.order !== undefined) updateData.order = parseInt(data.order);
    if (data.isActive !== undefined) updateData.isActive = data.isActive;

    return await prisma.brand.update({
      where: { id },
      data: updateData,
    });
  }

  async delete(id) {
    return await prisma.brand.delete({
      where: { id },
    });
  }
}

export default BrandRepository;
